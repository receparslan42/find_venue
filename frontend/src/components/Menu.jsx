// Component to display a list of food and drink items
const Menu = ({ menu }) => {
  return menu.map((item, index) => (
    <span key={index}>
      <span className="label label-warning">{item}</span>
      &nbsp;
    </span>
  ));
};

export default Menu;
