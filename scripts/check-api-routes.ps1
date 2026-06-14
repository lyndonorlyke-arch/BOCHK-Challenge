param(
  [string]$BaseUrl = "http://127.0.0.1:3000"
)

$ErrorActionPreference = "Stop"

function Invoke-Json {
  param(
    [string]$Method,
    [string]$Path,
    [object]$Body = $null
  )

  $uri = "$BaseUrl$Path"
  $options = @{
    Uri = $uri
    Method = $Method
    UseBasicParsing = $true
    ContentType = "application/json"
  }

  if ($null -ne $Body) {
    $options.Body = ($Body | ConvertTo-Json -Depth 12)
  }

  $response = Invoke-WebRequest @options
  if ($response.StatusCode -lt 200 -or $response.StatusCode -gt 299) {
    throw "$Method $Path returned $($response.StatusCode)"
  }

  return $response.Content | ConvertFrom-Json
}

function Assert-True {
  param(
    [bool]$Condition,
    [string]$Message
  )

  if (-not $Condition) {
    throw $Message
  }
}

$clientApplications = Invoke-Json -Method GET -Path "/api/client/applications"
Assert-True ($clientApplications.applications.Count -ge 8) "Client applications should include at least 8 cases"

$clientMessages = Invoke-Json -Method GET -Path "/api/client/messages"
Assert-True ($clientMessages.messages.Count -ge 4) "Client messages should include at least 4 messages"

$postedMessage = Invoke-Json -Method POST -Path "/api/client/messages" -Body @{
  applicationId = "TF-2026-0001"
  body = "Smoke test client reply"
  sender = "Smoke Test Trading Ltd."
}
Assert-True ([bool]$postedMessage.message.id) "POST /api/client/messages should return a message id"

$createdApplication = Invoke-Json -Method POST -Path "/api/client/applications" -Body @{
  companyName = "Smoke Test Trading Ltd."
  financingType = "Import Loan"
  amount = 1250000
  currency = "HKD"
}
Assert-True ([bool]$createdApplication.application.id) "POST /api/client/applications should return an application id"

$clientStatus = Invoke-Json -Method GET -Path "/api/client/status/$($createdApplication.application.id)"
Assert-True ([bool]$clientStatus.application.id) "Client status endpoint should return an application"

$uploadedDocument = Invoke-Json -Method POST -Path "/api/client/documents" -Body @{
  applicationId = $createdApplication.application.id
  documentType = "Commercial Invoice"
  fileName = "invoice-smoke.pdf"
}
Assert-True ([bool]$uploadedDocument.document.status) "POST /api/client/documents should return a document status"

$bankCases = Invoke-Json -Method GET -Path "/api/bank/cases"
Assert-True ($bankCases.cases.Count -ge 8 -and $bankCases.cases.Count -le 12) "Bank cases should include 8 to 12 cases"

$portfolio = Invoke-Json -Method GET -Path "/api/bank/portfolio"
Assert-True ($portfolio.kpis.Count -ge 4) "Portfolio should include KPI data"

$caseId = $bankCases.cases[0].id
$caseDetail = Invoke-Json -Method GET -Path "/api/bank/cases/$caseId"
Assert-True ([bool]$caseDetail.case.companyName) "Case detail endpoint should return company name"

$caseReview = Invoke-Json -Method POST -Path "/api/bank/cases/$caseId/review" -Body @{
  officer = "Smoke Tester"
  nextStatus = "Credit Review"
  notes = "Smoke case review"
}
Assert-True ([bool]$caseReview.message) "Case review endpoint should return a message"

$risk = Invoke-Json -Method GET -Path "/api/bank/risk/$caseId"
Assert-True ($risk.risk.score -ge 0) "Risk endpoint should return a numeric score"

$riskAction = Invoke-Json -Method POST -Path "/api/bank/risk/$caseId/action" -Body @{
  action = "Escalate"
  officer = "Smoke Tester"
}
Assert-True ([bool]$riskAction.message) "Risk action endpoint should return a message"

$documents = Invoke-Json -Method GET -Path "/api/bank/documents/$caseId"
Assert-True ($documents.documents.Count -ge 3) "Documents endpoint should return case documents"

$confirmedDocuments = Invoke-Json -Method POST -Path "/api/bank/documents/$caseId/confirm" -Body @{
  officer = "Smoke Tester"
  notes = "Smoke confirmation"
}
Assert-True ([bool]$confirmedDocuments.correctionLogEntry.correction) "Document confirm endpoint should return a correction log entry"

$memo = Invoke-Json -Method GET -Path "/api/bank/credit-memo/$caseId"
Assert-True ($memo.memo.sections.Count -ge 3) "Credit memo endpoint should return memo sections"

$regeneratedMemo = Invoke-Json -Method POST -Path "/api/bank/credit-memo/$caseId/regenerate" -Body @{
  sectionTitle = "Executive Summary"
}
Assert-True ($regeneratedMemo.memo.sections.Count -ge 3) "Credit memo regenerate endpoint should return memo sections"

$exportedMemo = Invoke-Json -Method POST -Path "/api/bank/credit-memo/$caseId/export" -Body @{
  officer = "Smoke Tester"
}
Assert-True ($exportedMemo.status -eq "Generated") "Credit memo export endpoint should return Generated status"

$submittedMemo = Invoke-Json -Method POST -Path "/api/bank/credit-memo/$caseId/submit" -Body @{
  officer = "Smoke Tester"
}
Assert-True ($submittedMemo.status -eq "Submitted") "Credit memo submit endpoint should return Submitted status"

$approval = Invoke-Json -Method POST -Path "/api/bank/approval/$caseId" -Body @{
  decision = "Conditional Approve"
  rationale = "Smoke test rationale"
  officer = "Smoke Tester"
}
Assert-True ([bool]$approval.workflow.currentStage) "Approval endpoint should return workflow status"

$audit = Invoke-Json -Method GET -Path "/api/bank/audit/$caseId"
Assert-True ($audit.auditLogs.Count -ge 3) "Audit endpoint should return audit logs"

$monitoring = Invoke-Json -Method GET -Path "/api/bank/monitoring"
Assert-True ($monitoring.facilities.Count -ge 4) "Monitoring endpoint should return active facilities"

$monitoringAction = Invoke-Json -Method POST -Path "/api/bank/monitoring/actions" -Body @{
  action = "Request updated bank statement"
  officer = "Smoke Tester"
}
Assert-True ($monitoringAction.status -eq "Queued") "Monitoring action endpoint should return Queued status"

Write-Host "API smoke checks passed for $BaseUrl"
