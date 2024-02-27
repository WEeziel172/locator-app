import RebelIcon from '@assets/icons/starwars-rebel.svg';
import { useTranslation } from 'react-i18next';

export function Header() {
  const { t } = useTranslation();
  return (
    <header
      data-testid="header"
      className={'h-[10%] flex items-center justify-start border-b-[1px] border-[#ffffff2e]'}
    >
      <img src={RebelIcon} className={'h-28 w-28'} />
      <h1 className={'text-amber-50 text-2xl'}>{t('header')}</h1>
    </header>
  );
}
