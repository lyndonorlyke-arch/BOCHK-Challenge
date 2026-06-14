import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "border-bank-red bg-bank-red text-white hover:bg-bank-darkRed",
  secondary: "border-bank-navy bg-bank-navy text-white hover:bg-bank-blue",
  ghost: "border-bank-line bg-white text-bank-navy hover:border-bank-blue"
};

export function Button({
  children,
  href,
  variant = "primary",
  type = "button",
  className = "",
  onClick
}: {
  children: React.ReactNode;
  href?: string;
  variant?: ButtonVariant;
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
}) {
  const classes = `inline-flex min-h-10 items-center justify-center rounded-md border px-4 py-2 text-sm font-bold shadow-sm ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
