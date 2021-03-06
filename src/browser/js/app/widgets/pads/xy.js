var _pads_base = require('./_pads_base'),
    Fader = require('./_fake_fader'),
    {clip} = require('../utils'),
    doubletabreset = require('../mixins/double_tap_reset')

var faderDefaults = Fader.defaults()

module.exports = class Xy extends _pads_base {

    static defaults() {

        return {
            type:'xy',
            id:'auto',
            linkId:'',

            _style:'style',

            label:'auto',
            left:'auto',
            top:'auto',
            width:'auto',
            height:'auto',
            color:'auto',
            css:'',

            _behaviour:'behaviour',

            snap:false,
            spring:false,
            doubleTap:false,

            _osc:'osc',

            rangeX:{min:0,max:1},
            rangeY:{min:0,max:1},
            logScaleX:false,
            logScaleY:false,
            value:'',
            precision:2,
            address:'auto',
            touchAddress:'',
            preArgs:[],
            split:false,
            target:[]
        }

    }

    constructor(options) {

        super(options)

        this.split = this.getProp('split')?
            typeof this.getProp('split') == 'object' && this.getProp('split').length == 2 ?
                this.getProp('split')
                : [this.getProp('address') + '/x', this.getProp('address') + '/y']
            : false

        this.widget.append(`
            <div class="labels row">
                <span class="input">X</span>
                <span class="input">Y</span>
            </div>
            <div class="row">
                <div class="input x"></div>
                <div class="input y"></div>
            </div>
        `)

        this.faders = {
            x: new Fader({props:{
                ...faderDefaults,
                id:0,
                compact:true,
                horizontal:true,
                height:'100%',
                width:'100%',
                value:this.getProp('value').length==2?this.getProp('value')[0]:'',
                snap:this.getProp('snap'),
                range:this.getProp('rangeX'),
                origin:'auto',
                precision:this.precision,
                logScale:this.getProp('logScaleX')
            }, cancelDraw: true}),
            y: new Fader({props:{
                ...faderDefaults,
                id:1,
                compact:true,
                horizontal:false,
                height:'100%',
                width:'100%',
                value:this.getProp('value').length==2?this.getProp('value')[1]:'',
                snap:this.getProp('snap'),
                range:this.getProp('rangeY'),
                origin:'auto',
                precision:this.precision,
                logScale:this.getProp('logScaleY')
            }, cancelDraw: true}),
        }

        this.inputs = [
            this.widget.find('.x').replaceWith(this.faders.x.input),
            this.widget.find('.y').replaceWith(this.faders.y.input)
        ]

        this.value = [this.faders.x.value, this.faders.y.value]

        this.wrapper.append(this.faders.x.widget)
        this.wrapper.append(this.faders.y.widget)

        this.wrapper.on('sync',(e)=>{
            e.stopPropagation()
        })

        this.wrapper.on('draginit',(e, data, traversing)=>{
            this.faders.x.draginitHandleProxy(e, data, traversing)
            this.faders.y.draginitHandleProxy(e, data, traversing)
            this.dragHandle()
        })
        this.wrapper.on('drag',(e, data, traversing)=>{
            this.faders.x.dragHandleProxy(e, data, traversing)
            this.faders.y.dragHandleProxy(e, data, traversing)
            this.dragHandle()
        })

        if (this.getProp('spring')) {
            this.wrapper.on('dragend', ()=>{
                this.setValue([this.faders.x.springValue,this.faders.y.springValue],{sync:true,send:true,fromLocal:true})
            })
        }

        if (this.getProp('doubleTap')) {
            doubletabreset(this.wrapper, ()=>{
                this.setValue([this.faders.x.springValue,this.faders.y.springValue],{sync:true, send:true, fromLocal:true})
            })
        }

        this.faders.x.input.change(()=>{
            var v = [this.faders.x.value, this.faders.y.value]
            this.setValue(v,{send:true,sync:true})
        })
        this.faders.y.input.change(()=>{
            var v = [this.faders.x.value, this.faders.y.value]
            this.setValue(v,{send:true,sync:true})
        })

    }

    dragHandle(){

        var x = this.faders.x.value,
            y = this.faders.y.value


        if (x != this.value[0] || y != this.value[1]) {
            this.setValue([x, y],{send:true,sync:true,dragged:true})
        }

    }


    setValue(v, options={}) {

        if (!v || !v.length || v.length!=2) return

        if (!options.dragged) {
            this.faders.x.setValue(v[0], {sync: false, send:false, dragged:false})
            this.faders.y.setValue(v[1], {sync: false, send:false, dragged:false})
        }

        this.value = [
            this.faders.x.value,
            this.faders.y.value
        ]

        if (options.send) this.sendValue()
        if (options.sync) this.widget.trigger({type:'sync', id:this.getProp('id'),widget:this.widget, linkId:this.getProp('linkId'), options:options})

        this.draw()

    }

    draw() {

        var x = clip(this.faders.x.percent / 100 * this.width,[0,this.width]),
            y = clip((1 - this.faders.y.percent / 100) * this.height,[0,this.height])

        this.clear()

        this.ctx.fillStyle = this.faders.x.colors.custom
        this.ctx.lineWidth = PXSCALE
        this.ctx.strokeStyle = this.faders.x.colors.custom

        this.ctx.globalAlpha = 0.3

        this.ctx.beginPath()
        this.ctx.arc(x, y, 10 * PXSCALE, Math.PI * 2, false)
        this.ctx.fill()

        this.ctx.globalAlpha = 0.1

        this.ctx.beginPath()
        this.ctx.moveTo(0,y)
        this.ctx.lineTo(this.width,y)
        this.ctx.moveTo(x,0)
        this.ctx.lineTo(x,this.height)
        this.ctx.stroke()

        this.ctx.globalAlpha = 1

        this.ctx.beginPath()
        this.ctx.arc(x, y, 4 * PXSCALE, Math.PI * 2, false)
        this.ctx.fill()

        this.clearRect = [
            [x - 10 * PXSCALE,0, 20 * PXSCALE, this.height],
            [0, y - 10 * PXSCALE, this.width, 20 * PXSCALE]
        ]
    }

}
