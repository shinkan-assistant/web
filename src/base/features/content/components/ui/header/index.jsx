import ContentTitleArea from './TitleArea';
import SubNavMenu from '../NavMenu';

export default function ContentHeader({info}) {
  return (
    <div>
      <div className="flex flex-col space-y-6">
        <ContentTitleArea 
          contentType={info.type}
          title={info.title}
          subTitle={info.subTitle}
        />
        {info.subNavInfos && 
          <SubNavMenu infos={info.subNavInfos} />
        }
      </div>
    </div>
  );
}
