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
      <dt data-testid={'description-item'} className={'font-bold'}>
        {title}
      </dt>
      <dd className={'ml-4'}>{description}</dd>
    </>
  );
}
