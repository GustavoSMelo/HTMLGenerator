import { TbLoaderQuarter } from 'react-icons/tb'
import { LoadAnimation } from './styled';

const Loading = () => {
    return (
        <LoadAnimation>
            <TbLoaderQuarter className="loadIcon" />
        </LoadAnimation>
    );
};

export default Loading;
