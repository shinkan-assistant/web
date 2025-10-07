import ContentTitleArea from './TitleArea';
import SubNavMenu from './NavMenu';

export default function ContentHeader({type, title, subTitle, subNavLinks}) {
  return (
    <div>
      <div className="flex flex-col space-y-6">
        <ContentTitleArea 
          type={type}
          title={title}
          subTitle={subTitle}
        />
        {subNavLinks && 
          <SubNavMenu links={subNavLinks} />
        }
      </div>
    </div>
  );
}
