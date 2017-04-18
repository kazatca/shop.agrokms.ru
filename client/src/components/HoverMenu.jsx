import React, {Component, PropTypes} from 'react';
import DropdownMenu from 'react-dd-menu';

class HoverMenu extends Component{
  static propTypes = {
    children: PropTypes.array,
    toggle: PropTypes.element.isRequired
  };

  static defaultProps = {
    children: []
  };

  constructor(props) {
    super(props);
    this.state = {isOpen: false};
  }

  open(){
    this.setState({isOpen: true});
  }

  close(){
    this.setState({isOpen: false});
  }

  render(){
    return (
      <span 
        className="hover-menu"
        onMouseEnter={() => this.open()}
        onMouseLeave={() => this.close()}
      >
        <DropdownMenu 
          align="right"
          close={() => this.close()}
          isOpen={this.state.isOpen}
          toggle={this.props.toggle}
        >
          {this.props.children}
        </DropdownMenu>
      </span>
    );
  }
}

export default HoverMenu;