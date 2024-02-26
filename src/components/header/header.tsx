import RebelIcon from '@assets/icons/starwars-rebel.svg';

export function Header() {
  return (
    <header className={'h-24 flex items-center justify-start glass'}>
      <img src={RebelIcon} className={'h-28 w-28'} />
      <h1 className={'text-amber-50 text-2xl'}>Rebel Locator App</h1>
    </header>
  );
}
