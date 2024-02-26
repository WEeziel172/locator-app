export function DescriptionItem({ title, description }: { title: string | number; description: string | number }) {
  return (
    <>
      <dt className={'font-bold'}>{title}</dt>
      <dd className={'ml-4'}>{description}</dd>
    </>
  );
}
