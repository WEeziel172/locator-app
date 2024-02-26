export function DescriptionList({ children }: { children: JSX.Element[] }) {
  return <dl className={'flex flex-col items-start'}>{children}</dl>;
}
