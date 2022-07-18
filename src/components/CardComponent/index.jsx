import { ButtonLink, Card, CardInfo, CardLink, CardLinkWrapper } from "./style";


const CardComponent = ({ user, key, removeLastNumberOnPhone }) => {
  return (
    <Card key={key}>
      <h3> {user?.name}</h3>
      <CardLinkWrapper>
        <CardLink href={`mailto:${user?.email}`}>{user?.email}</CardLink>

        <CardLink href={`tel:+`}>{removeLastNumberOnPhone(user?.phone)}</CardLink>

        <CardLink href={`http://${user.website}`}>{user.website}</CardLink>
      </CardLinkWrapper>
      <div className="company">
        <CardInfo>{user?.company?.name}</CardInfo>
        <CardInfo>{user?.company?.catchPhrase}</CardInfo>
        <CardInfo>{user?.company?.bs}</CardInfo>
      </div>

      <ButtonLink to={`/user/${user?.id}`}>Details</ButtonLink>
    </Card>
  );
};

export default CardComponent;
