export function Card({
  image,
  details,
  className,
  imageClassName,
  onClick,
  selected,
  showMore,
}: {
  image: string;
  details: JSX.Element[];
  className: string;
  onClick?: (e?: any) => void;
  selected: boolean;
  showMore?: boolean;
  imageClassName?: string;
}) {
  return (
    <div data-testid={'card'} onClick={onClick} className={className}>
      <div className={'w-full h-full'}>
        <img loading={'lazy'} src={image} className={imageClassName} />
      </div>
      <div>{details}</div>
    </div>
  );
}
