import React from 'react';
import style from './floatTipStyle.less';
import {IndexLink,Link} from 'react-router';

class FloatTip extends React.Component{
	constructor(props){
		super(props);
	}

	componentWillMount(){

	}

	componentDidMount(){
		/*let tipCon = this.refs.tip;
		let initTop = this.winHeight - 179;
		console.log(initTop);

		tipCon.style.cssText = 'top:'+initTop+'px;left:32px';*/

		/*window.onscroll = function(){
			requestAnimationFrame(()=>{
				tipCon.style.top = initTop+window.scrollY+'px';
			})
		}*/
		/*let tipCon = this.refs.tip;

		tipCon.addEventListener('click',()=>{
			window.location.href = this.locateUrl;
		});*/


	}
	tomyzc(from){
		ga('send', 'event', from, "login", "登录");
		setTimeout(function(){window.location.href = "#/myzc";},100)

	}
	toindex(from){
		ga('send', 'event', from, "return", "返回主页");
		setTimeout(function(){window.location.href = "/index.html";},100)

	}

	render(){
		var to = this.props.to;
		var from = this.props.from || "Phome";

		switch (to){
			/*case "myzc":
				return (
					<Link className={style['tipcontainer']} ref="tip" to="/myzc">
						<label className={'iconfont '+style['iconfont']}>&#xe609;</label>
					</Link>
				);
			default:
				return (
					<IndexLink className={style['tipcontainer']} ref="tip" to="/">
						<label className={'iconfont '+style['iconfont']}>&#xe620;</label>
					</IndexLink>
				);*/
			case "myzc":
				return (
					<span className={style['tipcontainer']} ref="tip" to="/myzc" onTouchTap={(e)=>{e.stopPropagation();this.tomyzc(from)}}>
						<label className={'iconfont '+style['iconfont']}>&#xe609;</label>
					</span>
				);
			default:
				return (
					<span className={style['tipcontainer']} ref="tip" to="/" onTouchTap={(e)=>{e.stopPropagation();this.toindex(from)}}>
						<label className={'iconfont '+style['iconfont']}>&#xe620;</label>
					</span>
				);
		}
	}


}

export default FloatTip;