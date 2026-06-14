$root = Split-Path -Parent $PSScriptRoot
$bat = Join-Path $PSScriptRoot "start-dev.bat"

Start-Process -FilePath $env:ComSpec `
  -ArgumentList @("/k", "`"$bat`"") `
  -WorkingDirectory $root `
  -WindowStyle Minimized
