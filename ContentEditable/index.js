import React from 'react';
import style from './index.less';


export default class ContentEditable extends React.Component {
	constructor() {
		super();
		this.state = {
			active:false
		}
		this.prevTextVal = '';
	}


	focusHandler(){
		this.setState({
			active:true
		})
	}


	blurHandler(){
		let inputValue = this.textInput.value;
		this.setState({
			active:false
		});

		this.refs.content.textContent = inputValue === ''? this.props.content:inputValue;
		this.props.onBlur&&this.props.onBlur(inputValue);
	}


	textHandler(e){
		let val = e.target.value+'';

        if(val.length>this.maxLength){
            e.target.value = this.prevTextVal;
            return;
        }else{
            this.prevTextVal = val;
        }
	}


	componentWillUpdate(nextProps,nextState){
		this.textInput.defaultValue = nextProps.content;
	}


	componentDidUpdate(prevProps,prevState){
		this.textInput.focus();
	}

	componentDidMount(){
		this.maxLength = this.props.maxLength || 20;
	}

	render() {
	    var { tagName,editAreaName,content,className,contentName} = this.props;

	    return React.createElement(
		    tagName || 'div',
		    {
		      onClick: this.focusHandler.bind(this),
		      className:style['edit-wrap']
		    },
		    [
		    	React.createElement(
		    		contentName||'span',
		    		{	
		    			ref:'content',
		    			key:'content',
		    			className:className
		    		},
		    		content
		    	),
		    	React.createElement(
		    		'label',
		    		{	
		    			key:'icon',
		    			className:'iconfont icon-xiugai '+style['edit-icon']
		    		}
		    	),
		    	React.createElement(
		    		editAreaName||'input',
		    		{	
		    			onChange:(e)=>{this.textHandler(e)},
		     			onBlur: this.blurHandler.bind(this),
		    			ref:(input)=>{this.textInput = input},
		    			key:'edit',
		    			className:style['edit-area']+(this.state.active?'':' '+style['hidden']),
		    			// autoFocus:true
		    		}
		    	)
		    ]	
		);
	}

	
}