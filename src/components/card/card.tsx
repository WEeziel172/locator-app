export function Card({
  image,
  details,
  className,
  onClick,
  selected,
}: {
  image: string;
  details: JSX.Element[];
  className: string;
  onClick?: (e?: any) => void;
  selected: boolean;
}) {
  return (
    <div onClick={onClick} className={className}>
      <div className={'w-full h-52'}>
        <img loading={'lazy'} src={image} className={'object-contain h-full w-full'} />
      </div>
      <div>{details}</div>
    </div>
  );
}
