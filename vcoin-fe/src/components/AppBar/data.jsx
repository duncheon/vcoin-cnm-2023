import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { SlNotebook } from 'react-icons/sl';
import { BsGem } from 'react-icons/bs';
import { AiOutlineAppstore } from 'react-icons/ai';
import './appbar.css';

const data = [
  {
    text: <p className="icon-text">Assets</p>,
    icon: <RiMoneyDollarCircleLine size={28} />,
  },
  {
    text: <p className="icon-text">Activity</p>,
    icon: <SlNotebook size={28} />,
  },
  { text: <p className="icon-text">NFTs</p>, icon: <BsGem size={28} /> },
  {
    text: <p className="icon-text">DApps</p>,
    icon: <AiOutlineAppstore size={28} />,
  },
];

export default data;
