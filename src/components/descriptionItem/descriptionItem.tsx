export function DescriptionItem({
  title,
  description,
  className,
}: {
  title: string | number;
  description: string | number;
  className?: string;
}) {
  return (
    <>
      <dt data-testid={'description-item'} className={'font-bold text-sm'}>
        {title}
      </dt>
      <dd className={'ml-4 text-xs'}>{description}</dd>
    </>
  );
}
