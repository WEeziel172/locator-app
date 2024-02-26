export function Card({
  image,
  details,
  className,
  imageClassName,
  onClick,
  selected,
}: {
  image: string;
  details: JSX.Element[];
  className: string;
  onClick?: (e?: any) => void;
  selected: boolean;
  imageClassName?: string;
}) {
  return (
    <div onClick={onClick} className={className}>
      <div className={'w-full h-52'}>
        <img loading={'lazy'} src={image} className={imageClassName} />
      </div>
      <div>{details}</div>
    </div>
  );
}
