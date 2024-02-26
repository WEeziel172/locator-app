export function DescriptionList({
  children,
  className,
}: {
  children: JSX.Element[] | JSX.Element;
  className?: string;
}) {
  return (
    <dl data-testid={'description-list'} className={`flex flex-col items-start ${className}`}>
      {children}
    </dl>
  );
}
