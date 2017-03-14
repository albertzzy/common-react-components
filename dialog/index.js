import React from 'react';
import style from './index.less';

var Dialog = React.createClass({
    getInitialState:function(){
        return{

        }
    },
    componentDidMount:function(){

    },
    contenthandle: function(e){
        this.btnl(e);
    },
    btnl:function(e){
        this.props.btnlf && this.props.btnlf();
        e.stopPropagation();
    },
    btnr:function(e){
        this.props.btnrf && this.props.btnrf();
        e.stopPropagation();
    },
    render: function(){
        var alertBtn = this.props.alertBtn;
        var content1 = this.props.content1;
        var content2 = this.props.content2;
        var btn1 = this.props.btn1 || "取消";
        var btn2 = this.props.btn2 || "确认";

        return (
            <div className={alertBtn ? style['alert-wrap'] : "hide"} onClick={this.contenthandle}>
                <div className={style['alert-content']} onClick={this.conent}>
                    <div className={style['content-up']}>
                        {typeof content1 !== 'undefined'?
                            <div className={style['content-up1']}>{content1}</div>:
                            ''
                        }
                        {typeof content2 !== 'undefined'?
                            <div className={style['content-up2']}>{content2}</div>:
                            ''
                        }
                    </div>
                    <div className={style['content-down']}>
                        <div className={style['content-down1']} onClick={this.btnl}>{btn1}</div>
                        <div className={style['content-down2']} onClick={this.btnr}>{btn2}</div>
                    </div>
                </div>
            </div>
        );
    }
});


module.exports = Dialog;