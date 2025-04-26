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

type IconProps = {
  category: string;
  onClick?: () => void;
  className?: any;
  width: number;
  height: number;
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
  Chat: <Chat />

};

const Icon: FC<IconProps> = ({ category, onClick, className, width, height }) => {
  const IconComponent = iconMap[category];

  return IconComponent ? (
    React.cloneElement(IconComponent, { className, width, height, onClick })
  ) : (
    <>Icon Not Found</>
  );
};

export default Icon;
