/**
 * Created by Anthony on 4/12/2017.
 */
import React, { Component } from 'react';
import './Calc.css';
import Rewards from './Rewards';

var val = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
]

var hid = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
]

const defaultRewards = [10000,36,720,360,80,252,108,72,54,180,72,180,119,36,306,1080,144,1800,3600]

var nums = [1,2,3,4,5,6,7,8,9]

var sums = [0,0,0,0,0,0,0,0]

var tri = [0,0,0,0,0,0,0,0]

var count = 0

var sel = -1

var selsum = -1

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function randomize() {
    hid = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ]
    var revx = Math.floor(Math.random() * 3);
    var revy = Math.floor(Math.random() * 3);
    hid[revx][revy] = 1;
    var n = 0;
    shuffle(nums);
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            val[j][i] = nums[n];
            n++;
            }
    }
    sum();
}

function sum(){
    sums[0] = val[0][0] + val[1][0] + val[2][0];
    sums[1] = val[0][1] + val[1][1] + val[2][1];
    sums[2] = val[0][2] + val[1][2] + val[2][2];

    sums[3] = val[0][0] + val[0][1] + val[0][2];
    sums[4] = val[1][0] + val[1][1] + val[1][2];
    sums[5] = val[2][0] + val[2][1] + val[2][2];

    sums[6] = val[0][0] + val[1][1] + val[2][2];
    sums[7] = val[0][2] + val[1][1] + val[2][0];
}

function printVal(i){
    var s = "\t";
    if (i == 3)
        return sums[7]+'\t'+sums[3]+'\t'+sums[4]+'\t'+sums[5]+'\t'+sums[6];
        for (var j = 0; j < 3; j++)
            s += val[j][i] + "\t";
        s += sums[i]
    return s;
}



class Calc extends Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn: true};

        // This binding is necessary to make `this` work in the callback
        this.scratch = this.scratch.bind(this);
        this.random = this.random.bind(this);
        this.select = this.select.bind(this);
        this.submit = this.submit.bind(this);
        this.changeColor = this.changeColor.bind(this);
    }

    scratch(x, y) {
        if(selsum >= 0) {
            if (!hid[x][y] && count < 3) {
                hid[x][y] = true;
                count++;
            }
            this.setState(prevState => ({
                isToggleOn: !prevState.isToggleOn
            }));
        }
    }

    select(n){
        if(count > 2) {
            tri = [0, 0, 0, 0, 0, 0, 0, 0];
            tri[n] = true;
            sel = n;
            this.setState(prevState => ({
                isToggleOn: !prevState.isToggleOn // ▼▽▶▷▲△
            }));
        }
    }

    submit(){
        if(sel > -1 && count > 2) {
            hid = [
                [1, 1, 1],
                [1, 1, 1],
                [1, 1, 1]
            ]

            selsum = sums[sel];
            this.setState(prevState => ({
                isToggleOn: !prevState.isToggleOn
            }));
        }
    }

    random() {
        selsum = 0;
        count = 0;
        tri = [0,0,0,0,0,0,0,0];
        {randomize()}
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }

    changeColor(id,op){
        document.getElementById(id).style.opacity = op;
    }

    render() {
        return (
            <div className="Calc">
                <div className="Scratch">
                <p>
                    {'\t\t'}
                    <text onClick={() => this.select(6)} style={{color: 'lightyellow'}}>{tri[6] ? '▲' : '△'}</text>
                    {'\t'}
                    <img src={require('./scratch.png')} className="Scratch" alt="" style={{opacity:0}}/>
                    <text onClick={() => this.select(3)} style={{color: 'lightyellow'}}>{tri[3] ? '▼' : '▽'}</text>
                    {'\t'}
                    <img src={require('./scratch.png')} className="Scratch" alt="" style={{opacity:0}}/>
                    <text onClick={() => this.select(4)} style={{color: 'lightyellow'}}>{tri[4] ? '▼' : '▽'}</text>
                    {'\t'}
                    <img src={require('./scratch.png')} className="Scratch" alt="" style={{opacity:0}}/>
                    <text onClick={() => this.select(5)} style={{color: 'lightyellow'}}>{tri[5] ? '▼' : '▽'}</text>
                    {'\t\t'}
                    <text onClick={() => this.select(7)} style={{color: 'lightyellow'}}>{tri[7] ? '▲' : '△'}</text>
                </p>

                <p>
                    <text  onClick={() => this.select(0)} style={{color: 'lightyellow'}}>{tri[0] ? '▶' : '▷'}</text>
                    {'\t'}
                    <img src={require('./scratch.png')} onClick={() => this.scratch(0,0)} className="Scratch" alt="" id="scratch1" onMouseOver={() =>this.changeColor("scratch1",.5)} onMouseLeave={() => this.changeColor("scratch1",1)}/>
                    <text onClick={() => this.scratch(0,0)} onMouseOver={() =>this.changeColor("scratch1",.5)} onMouseLeave={() => this.changeColor("scratch1",1)}>{hid[0][0] ? val[0][0] : ' '}</text>
                    {'\t'}
                    <img src={require('./scratch.png')} onClick={() => this.scratch(1,0)} className="Scratch" alt="" id="scratch2" onMouseOver={() =>this.changeColor("scratch2",.5)} onMouseLeave={() => this.changeColor("scratch2",1)}/>
                    <text onClick={() => this.scratch(1,0)} onMouseOver={() =>this.changeColor("scratch2",.5)} onMouseLeave={() => this.changeColor("scratch2",1)}>{hid[1][0] ? val[1][0] : ' '}</text>
                    {'\t'}
                    <img src={require('./scratch.png')} onClick={() => this.scratch(2,0)} className="Scratch" alt="" id="scratch3" onMouseOver={() =>this.changeColor("scratch3",.5)} onMouseLeave={() => this.changeColor("scratch3",1)}/>
                    <text onClick={() => this.scratch(2,0)} onMouseOver={() =>this.changeColor("scratch3",.5)} onMouseLeave={() => this.changeColor("scratch3",1)}>{hid[2][0] ? val[2][0] : '  '}</text>
                    {'\t'}
                </p>
                <p>
                    <text onClick={() => this.select(1)} style={{color: 'lightyellow'}}>{tri[1] ? '▶' : '▷'}</text>
                    {'\t'}
                    <img src={require('./scratch.png')} onClick={() => this.scratch(0,1)} className="Scratch" alt="" id="scratch4" onMouseOver={() =>this.changeColor("scratch4",.5)} onMouseLeave={() => this.changeColor("scratch4",1)}/>
                    <text onClick={() => this.scratch(0,1)} onMouseOver={() =>this.changeColor("scratch4",.5)} onMouseLeave={() => this.changeColor("scratch4",1)}>{hid[0][1] ? val[0][1] : ' '}</text>
                    {'\t'}
                    <img src={require('./scratch.png')} onClick={() => this.scratch(1,1)} className="Scratch" alt="" id="scratch5" onMouseOver={() =>this.changeColor("scratch5",.5)} onMouseLeave={() => this.changeColor("scratch5",1)}/>
                    <text onClick={() => this.scratch(1,1)} onMouseOver={() =>this.changeColor("scratch5",.5)} onMouseLeave={() => this.changeColor("scratch5",1)}>{hid[1][1] ? val[1][1] : ' '}</text>
                    {'\t'}
                    <img src={require('./scratch.png')} onClick={() => this.scratch(2,1)} className="Scratch" alt="" id="scratch6" onMouseOver={() =>this.changeColor("scratch6",.5)} onMouseLeave={() => this.changeColor("scratch6",1)}/>
                    <text onClick={() => this.scratch(2,1)} onMouseOver={() =>this.changeColor("scratch6",.5)} onMouseLeave={() => this.changeColor("scratch6",1)}>{hid[2][1] ? val[2][1] : '  '}</text>
                    {'\t'}
                </p>
                <p>
                    <text onClick={() => this.select(2)} style={{color: 'lightyellow'}}>{tri[2] ? '▶' : '▷'}</text>
                    {'\t'}
                    <img src={require('./scratch.png')} onClick={() => this.scratch(0,2)} className="Scratch" alt="" id="scratch7" onMouseOver={() =>this.changeColor("scratch7",.5)} onMouseLeave={() => this.changeColor("scratch7",1)}/>
                    <text onClick={() => this.scratch(0,2)} onMouseOver={() =>this.changeColor("scratch7",.5)} onMouseLeave={() => this.changeColor("scratch7",1)}>{hid[0][2] ? val[0][2] : ' '}</text>
                    {'\t'}
                    <img src={require('./scratch.png')} onClick={() => this.scratch(1,2)} className="Scratch" alt="" id="scratch8" onMouseOver={() =>this.changeColor("scratch8",.5)} onMouseLeave={() => this.changeColor("scratch8",1)}/>
                    <text onClick={() => this.scratch(1,2)} onMouseOver={() =>this.changeColor("scratch8",.5)} onMouseLeave={() => this.changeColor("scratch8",1)}>{hid[1][2] ? val[1][2] : ' '}</text>
                    {'\t'}
                    <img src={require('./scratch.png')} onClick={() => this.scratch(2,2)} className="Scratch" alt="" id="scratch9" onMouseOver={() =>this.changeColor("scratch9",.5)} onMouseLeave={() => this.changeColor("scratch9",1)}/>
                    <text onClick={() => this.scratch(2,2)} onMouseOver={() =>this.changeColor("scratch9",.5)} onMouseLeave={() => this.changeColor("scratch9",1)}>{hid[2][2] ? val[2][2] : '  '}</text>
                    {'\t'}
                </p>
                    <p>
                        <button onClick={this.random}>New Ticket</button>
                        <button onClick={this.submit}>Submit</button>
                    </p>
                    <p>
                        <text style = {{color: 'lightgreen'}}>{defaultRewards[selsum-6]}</text>
                    </p>
                </div>
                <div className="Rewards">
                    <Rewards/>
                </div>
            </div>

        );
    }
}

export default Calc;