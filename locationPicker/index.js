import React from 'react';
import style from './locationPicker.less';
import areas from './areas';


class LocationPicker extends React.Component{
	constructor(props){
		super(props);
		this.fontSize = parseFloat(document.documentElement.style.fontSize);

		this.state = {
			leftList : ["北京市", "天津市", "河北省", "山西省", "内蒙古自治区", "辽宁省", "吉林省", "黑龙江省", "上海市", "江苏省", "浙江省", "安徽省", "福建省", "江西省", "山东省", "河南省", "湖北省", "湖南省", "广东省", "广西壮族自治区", "海南省", "重庆市", "四川省", "贵州省", "云南省", "西藏自治区", "陕西省", "甘肃省", "青海省", "宁夏回族自治区", "新疆维吾尔自治区", "台湾省", "香港特别行政区", "澳门特别行政区"],
			rightList : ['北京'],
			provinceIndex:0,
			cityIndex:0
		};

		this.listIndex_l = 0;
		this.listIndex_r = 0;
		this.colLeftLen = 0;
		this.colRightLen = 0;

		// right col initial status
		this.initY_r = 0;
		this.posY_r = 0;
		this.endY_r = 0;
		this.initTop_r = 180/75*this.fontSize;

	}	

	bindLeftHandler(obj){
		let fontSize = this.fontSize;
		let itemLen = 60/75*fontSize;

		let initY,posY,endY=0,
			initTop = 180/75*fontSize,
			startTop = initTop;

		let touchStartHandler = (e)=>{
			e.preventDefault();
			initY = e.changedTouches[0].clientY;
		};

		let touchMoveHandler = (e)=>{
			posY = e.changedTouches[0].clientY;
			this.refs.leftlist.style.cssText = '-webkit-transform:translate3d(0,'+(initTop+posY-initY)+'px,0);transform:translate3d(0,'+(initTop+posY-initY)+'px,0);';
		};


		let touchEndHandler = (e)=>{
			endY = e.changedTouches[0].clientY;
			let idx = this.getIndex(initY-endY);
			initTop = initTop - (idx*itemLen);

			let colLen = this.colLeftLen,
			list = this.refs.leftlist;
			
			if(initTop>startTop){
				initTop = startTop;
				list.style.cssText = '-webkit-transform:translate3d(0,'+startTop+'px,0);transform:translate3d(0,'+startTop+'px,0)';
				
				this.listIndex_l = 0;

			}else if(initTop<startTop-(colLen-1)*itemLen){
				initTop = startTop-(colLen-1)*itemLen;
				list.style.cssText = '-webkit-transform:translate3d(0,'+initTop+'px,0);transform:translate3d(0,'+initTop+'px,0)';

				this.listIndex_l = colLen-1;

			}else{
				list.style.cssText = '-webkit-transform:translate3d(0,'+(initTop)+'px,0);transform:translate3d(0,'+(initTop)+'px,0)';

				this.listIndex_l += idx;
			}

			this.setState({
				provinceIndex:this.listIndex_l
			});

			this.resetZero();
			this.initRightCol(this.listIndex_l,startTop);
		};

		obj.addEventListener('touchstart',touchStartHandler);
		obj.addEventListener('touchmove',touchMoveHandler);
		obj.addEventListener('touchend',touchEndHandler.bind(this));
	}





	bindRightHandler(obj){
		let fontSize = this.fontSize;
		let itemLen = 60/75*fontSize;

		
		let startTop = 180/75*fontSize;

		let touchStartHandler = (e)=>{
			e.preventDefault();
			this.initY_r = e.changedTouches[0].clientY;
		};

		let touchMoveHandler = (e)=>{
			this.posY_r = e.changedTouches[0].clientY;
			this.refs.rightlist.style.cssText = '-webkit-transform:translate3d(0,'+(this.initTop_r+this.posY_r-this.initY_r)+'px,0);transform:translate3d(0,'+(this.initTop_r+this.posY_r-this.initY_r)+'px,0);';
		};


		let touchEndHandler = (e)=>{
			this.endY_r = e.changedTouches[0].clientY;
			let idx = this.getIndex(this.initY_r-this.endY_r);
			this.initTop_r = this.initTop_r - (idx*itemLen);

			let colLen = this.colRightLen,
			list = this.refs.rightlist;
			
			if(this.initTop_r>startTop){
				this.initTop_r = startTop;
				list.style.cssText = '-webkit-transform:translate3d(0,'+startTop+'px,0);transform:translate3d(0,'+startTop+'px,0)';
				
				this.listIndex_r = 0;

			}else if(this.initTop_r<startTop-(colLen-1)*itemLen){
				this.initTop_r = startTop-(colLen-1)*itemLen;
				list.style.cssText = '-webkit-transform:translate3d(0,'+this.initTop_r+'px,0);transform:translate3d(0,'+this.initTop_r+'px,0)';

				this.listIndex_r = colLen-1;

			}else{
				list.style.cssText = '-webkit-transform:translate3d(0,'+(this.initTop_r)+'px,0);transform:translate3d(0,'+(this.initTop_r)+'px,0)';

				this.listIndex_r += idx;
			}


			this.setState({
				cityIndex:this.listIndex_r
			});
			
		};


		obj.addEventListener('touchstart',touchStartHandler);
		obj.addEventListener('touchmove',touchMoveHandler);
		obj.addEventListener('touchend',touchEndHandler.bind(this));
	}


	resetZero(){
		this.initY_r = 0;
		this.posY_r = 0;
		this.endY_r = 0;
		this.initTop_r = 180/75*this.fontSize;
		this.setState({
			cityIndex:0
		});
	}





	initRightCol(index,startTop){
		this.listIndex_r = 0;

		let cities = this.getCitys(index);
		this.setState({
			rightList:cities
		});

		let colRightLen = this.state.rightList.length;
		this.colRightLen = colRightLen;

		this.refs.rightlist.style.cssText = '-webkit-transform:translate3d(0,'+startTop+'px,0);transform:translate3d(0,'+startTop+'px,0)';
	}


	getIndex(len){
		let fontSize = this.fontSize;
		let tmp = len/(60/75*fontSize);
		return Math.round(tmp);
	}


	getCitys(index){
		let areasKeys = Object.keys(areas),k,citys = [];
		
		let province = areas[areasKeys[index]];

		citys = province.cities.map((item,index)=>{
			return item.name;
		});

		return citys;
	}

	cancelHandler(){
		this.hide();
		this.props.cancelLocationPicker&&this.props.cancelLocationPicker();
	}


	sureHandler(){
		this.setValue();
		this.hide();
	}

	setValue(){
		let areasKeys = Object.keys(areas),
		provinceIndex = this.state.provinceIndex,
		cityIndex = this.state.cityIndex;

//console.log(provinceIndex,cityIndex);

		let area = areas[areasKeys[provinceIndex]],
			result = area.name+' '+area.cities[cityIndex].name;

		this.props.updateLocation(result);
	}


	hide(){
		let panel = this.refs.panel,panelStyle = panel.style;
		panelStyle.cssText = '-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0);';

		/*panel.addEventListener('transitionend webkitTransitionEnd',()=>{
			panelStyle.cssText = 'display:none';
			
		});*/
	}



	componentDidMount(){
		let colLeft = this.refs.leftcol,
		colRight = this.refs.rightcol;

		let colLeftLen = this.state.leftList.length;
		this.colLeftLen = colLeftLen;

		this.bindLeftHandler(colLeft);
		this.bindRightHandler(colRight);

	}


	render(){
		let panelStyle = this.props.show ? {'WebkitTransform':'translate3d(0,0,0)','transform':'translate3d(0,0,0)'} : {'WebkitTransform':'translate3d(0,100%,0)','transform':'translate3d(0,100%,0)'};
		var that = this;
		return(
			<div className={style['panel']} ref="panel" style={panelStyle}>
				{true ? null :<div className={this.props.mengceng ? style['mengceng'] : "hide"}></div>}
				<span className={style['controls']}>
					<span className={style['cancel-w']} onTouchTap={function(e){e.preventDefault();that.cancelHandler.call(that)}}>
						<label className={style['con-btn']+' '+style['cancel']}>取消</label>
					</span>
					<span className={style['sure-w']} onTouchTap={function(e){e.preventDefault();that.sureHandler.call(that)}}>
						<label className={style['con-btn']+' '+style['sure']}>完成</label>
					</span>
				</span>
				<div className={style['wrap']}>
					<div className={style['col-item']} ref="leftcol">
						<ul className={style['col-ul-l']} ref="leftlist">
							{this.state.leftList.map((item,i)=>{
								return <li className={style['col-li']} key={i}>{item}</li>
							})}
						</ul>
					</div>
					<div className={style['col-item']} ref="rightcol">
						<ul className={style['col-ul-r']} ref="rightlist">
							{this.state.rightList.map((item,i)=>{
								return <li className={style['col-li']} key={i}>{item}</li>
							})}
						</ul>
					</div>
					<div className={style['highlight']}></div>
				</div>	

			</div>
		);

	}

}


export default LocationPicker;