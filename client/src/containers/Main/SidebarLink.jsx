import React from 'react';
import PropTypes from 'prop-types';
import {
  Menu,
  Icon,
} from 'semantic-ui-react';

SidebarLink.propTypes = {
  active: PropTypes.bool,
  name: PropTypes.string,
  label: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onNavigate: PropTypes.func,
};

function SidebarLink(props) {
  const handleClick = () => {
    if (props.onNavigate) {
      props.onNavigate(props.url);
    }
  };

  return (
    <Menu.Item as='a' name={props.name} onClick={handleClick} active={props.active}>
      <Icon name={props.icon} />
      {props.label}
    </Menu.Item>
  )
}

export default SidebarLink;
