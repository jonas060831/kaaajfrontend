import React, { FC, JSX } from 'react'
import Menu from '../../assets/svgs/menu.svg?react'
import RightArrow from '../../assets/svgs/rightArrow.svg?react'
import LeftArrow from '../../assets/svgs/leftArrow.svg?react'
import Account from '../../assets/svgs/account.svg?react'
import Services from '../../assets/svgs/services.svg?react'
import Careers from '../../assets/svgs/careers.svg?react'
import About from '../../assets/svgs/about.svg?react'
import Contact from '../../assets/svgs/contact.svg?react'
import SignIn from '../../assets/svgs/signalRight.svg?react'
import Bell from '../../assets/svgs/bell.svg?react'
import Chat from '../../assets/svgs/chat.svg?react'
import SignUp from '../../assets/svgs/signUp.svg?react'
import EyeOpen from '../../assets/svgs/eyeopen.svg?react'
import EyeClose from '../../assets/svgs/eyeclose.svg?react'
import Loading from '../../assets/svgs/loading.svg?react'
import Off from '../../assets/svgs/off.svg?react'
import Desktop from '../../assets/svgs/desktop.svg?react'
import Home from '../../assets/svgs/home.svg?react'
import MoneyBag from '../../assets/svgs/moneybag.svg?react'
import AdManager from '../../assets/svgs/admanager.svg?react'
import Reports from '../../assets/svgs/reports.svg?react'
import Times from '../../assets/svgs/times.svg?react'
import Switch from '../../assets/svgs/switch.svg?react'
import GreenIndicator from '../../assets/svgs/indicators/green_indicator.svg?react'
import RedIndicator from '../../assets/svgs/indicators/red_indicator.svg?react'
import DefaultIndicator from '../../assets/svgs/indicators/default_indicator.svg?react'
import Plus from '../../assets/svgs/plus.svg?react'
import Check from '../../assets/svgs/check.svg?react'

type IconProps = {
  category: string;
  onClick?: () => void;
  className?: any;
  width: number;
  height: number;
  color?: string;
};

const iconMap: { [key: string]: JSX.Element } = {
  Menu: <Menu />,
  RightArrow: <RightArrow />,
  LeftArrow: <LeftArrow />,
  Account: <Account />,
  Services: <Services />,
  Careers: <Careers />,
  About: <About />,
  Contact: <Contact />,
  SignIn: <SignIn />,
  SignUp: <SignUp />,
  Bell: <Bell />,
  Chat: <Chat />,
  EyeOpen: <EyeOpen />,
  EyeClose: <EyeClose />,
  Loading: <Loading />,
  Off: <Off />,
  Desktop: <Desktop />,
  Home: <Home />,
  MoneyBag: <MoneyBag />,
  AdManager: <AdManager />,
  Reports: <Reports />,
  Times: <Times />,
  Switch: <Switch />,
  GreenIndicator: <GreenIndicator />,
  RedIndicator: <RedIndicator />,
  DefaultIndicator: <DefaultIndicator />,
  Plus: <Plus />,
  Check: <Check />
};

const Icon: FC<IconProps> = ({ category, onClick, className, width, height, color }) => {
  const IconComponent = iconMap[category];

  return IconComponent ? (
    React.cloneElement(IconComponent, { className, width, height, onClick, color })
  ) : (
    <>Icon Not Found</>
  );
};

export default Icon;
