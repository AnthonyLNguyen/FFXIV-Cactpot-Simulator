/**
 * Created by Anthony on 4/12/2017.
 */
import React, {Component} from 'react';
import './Calc.css';
import Rewards from './Rewards';

let val = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

let hid = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

const defaultRewards = [10000, 36, 720, 360, 80, 252, 108, 72, 54, 180, 72, 180, 119, 36, 306, 1080, 144, 1800, 3600];

let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

let sums = [0, 0, 0, 0, 0, 0, 0, 0];

let tri = [0, 0, 0, 0, 0, 0, 0, 0];

let count = 0;

let sel = -1;

let selsum = -1;

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
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
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    let revx = Math.floor(Math.random() * 3);
    let revy = Math.floor(Math.random() * 3);
    hid[revx][revy] = 1;
    let n = 0;
    shuffle(nums);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            val[j][i] = nums[n];
            n++;
        }
    }
    sum();
}

function sum() {
    sums[0] = val[0][0] + val[1][0] + val[2][0];
    sums[1] = val[0][1] + val[1][1] + val[2][1];
    sums[2] = val[0][2] + val[1][2] + val[2][2];

    sums[3] = val[0][0] + val[0][1] + val[0][2];
    sums[4] = val[1][0] + val[1][1] + val[1][2];
    sums[5] = val[2][0] + val[2][1] + val[2][2];

    sums[6] = val[0][0] + val[1][1] + val[2][2];
    sums[7] = val[0][2] + val[1][1] + val[2][0];
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
        this.changeOpacity = this.changeOpacity.bind(this);
        this.revertOpacity = this.revertOpacity.bind(this);
        this.mOpac = this.mOpac.bind(this);
        this.mlOpac = this.mlOpac.bind(this);
    }

    scratch(x, y) {
        if (selsum >= 0) {
            if (!hid[x][y] && count < 3) {
                hid[x][y] = true;
                count++;
            }
            this.setState(prevState => ({
                isToggleOn: !prevState.isToggleOn
            }));
        }
    }

    revertOpacity() {
        this.changeOpacity("scratch1", 1);
        this.changeOpacity("scratch2", 1);
        this.changeOpacity("scratch3", 1);
        this.changeOpacity("scratch4", 1);
        this.changeOpacity("scratch5", 1);
        this.changeOpacity("scratch6", 1);
        this.changeOpacity("scratch7", 1);
        this.changeOpacity("scratch8", 1);
        this.changeOpacity("scratch9", 1);
    }

    select(n) {
        this.revertOpacity();
        if (count > 2) {
            tri = [0, 0, 0, 0, 0, 0, 0, 0];
            tri[n] = true;
            sel = n;
            this.setState(prevState => ({
                isToggleOn: !prevState.isToggleOn // ▼▽▶▷▲△
            }));
            let s1 = "scratch";
            let s2 = s1, s3 = s1;
            switch (sel) {
                case 0:
                    s1 += 1;
                    s2 += 2;
                    s3 += 3;
                    break;
                case 1:
                    s1 += 4;
                    s2 += 5;
                    s3 += 6;
                    break;
                case 2:
                    s1 += 7;
                    s2 += 8;
                    s3 += 9;
                    break;
                case 3:
                    s1 += 1;
                    s2 += 4;
                    s3 += 7;
                    break;
                case 4:
                    s1 += 2;
                    s2 += 5;
                    s3 += 8;
                    break;
                case 5:
                    s1 += 3;
                    s2 += 6;
                    s3 += 9;
                    break;
                case 6:
                    s1 += 1;
                    s2 += 5;
                    s3 += 9;
                    break;
                case 7:
                    s1 += 3;
                    s2 += 5;
                    s3 += 7;
                    break;
                default:
                    break;
            }
            this.changeOpacity(s1, .3);
            this.changeOpacity(s2, .3);
            this.changeOpacity(s3, .3);
        }


    }

    submit() {
        if (sel > -1 && count > 2) {

            hid = [
                [1, 1, 1],
                [1, 1, 1],
                [1, 1, 1]
            ];

            selsum = sums[sel];
            this.setState(prevState => ({
                isToggleOn: !prevState.isToggleOn
            }));
        }
    }

    random() {
        this.revertOpacity();
        selsum = 0;
        count = 0;
        tri = [0, 0, 0, 0, 0, 0, 0, 0];
        randomize();
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }

    changeOpacity(id, op) {
        document.getElementById(id).style.opacity = op;
    }

    mOpac(id) {
        if (count <= 3) this.changeOpacity(id, .5);
    }

    mlOpac(id) {
        if (count <= 3) this.changeOpacity(id, 1);
    }

    changeColor(id, col) {
        document.getElementById(id).style.color = col;
    }

    render() {
        return (
            <div className="Calc">
                <p>
                    <button onClick={this.random}>New Ticket</button>
                </p>
                <div className="Scratch" id="scratch">
                    <p className="Buttons">
                        <text onClick={() => this.select(6)} style={{color: 'lightyellow'}}>{tri[6] ? '▲' : '△'}</text>
                        <text onClick={() => this.select(3)} style={{color: 'lightyellow'}}>{tri[3] ? '▼' : '▽'}</text>
                        <text onClick={() => this.select(4)} style={{color: 'lightyellow'}}>{tri[4] ? '▼' : '▽'}</text>
                        <text onClick={() => this.select(5)} style={{color: 'lightyellow'}}>{tri[5] ? '▼' : '▽'}</text>
                        <text onClick={() => this.select(7)} style={{color: 'lightyellow'}}>{tri[7] ? '▲' : '△'}</text>
                    </p>

                    <p>
                        <text onClick={() => this.select(0)} style={{color: 'lightyellow'}}>{tri[0] ? '▶' : '▷'}</text>
                        {'\t'}
                        <img src={require('./scratch.png')} onClick={() => this.scratch(0, 0)} className="Scratch"
                             alt="" id="scratch1"
                             onMouseOver={() => this.mOpac("scratch1")}
                             onMouseLeave={() => this.mlOpac("scratch1")}/>
                        <text onClick={() => this.scratch(0, 0)}
                              onMouseOver={() => this.mOpac("scratch1")}
                              onMouseLeave={() => this.mlOpac("scratch1")}>{hid[0][0] ? val[0][0] : ' '}</text>
                        {'\t'}
                        <img src={require('./scratch.png')} onClick={() => this.scratch(1, 0)} className="Scratch"
                             alt="" id="scratch2"
                             onMouseOver={() => this.mOpac("scratch2")}
                             onMouseLeave={() => this.mlOpac("scratch2")}/>
                        <text onClick={() => this.scratch(1, 0)}
                              onMouseOver={() => (count > 2) ? this.changeOpacity("scratch2", 1) : this.changeOpacity("scratch2", .5)}
                              onMouseLeave={() => this.changeOpacity("scratch2", 1)}>{hid[1][0] ? val[1][0] : ' '}</text>
                        {'\t'}
                        <img src={require('./scratch.png')} onClick={() => this.scratch(2, 0)} className="Scratch"
                             alt="" id="scratch3"
                             onMouseOver={() => this.mOpac("scratch3")}
                             onMouseLeave={() => this.mlOpac("scratch3")}/>
                        <text onClick={() => this.scratch(2, 0)}
                              onMouseOver={() => this.mOpac("scratch3")}
                              onMouseLeave={() => this.mlOpac("scratch3")}>{hid[2][0] ? val[2][0] : '  '}</text>
                        {'\t'}
                    </p>
                    <p>
                        <text onClick={() => this.select(1)} style={{color: 'lightyellow'}}>{tri[1] ? '▶' : '▷'}</text>
                        {'\t'}
                        <img src={require('./scratch.png')} onClick={() => this.scratch(0,1)} className="Scratch"
                             alt="" id="scratch4"
                             onMouseOver={() => this.mOpac("scratch4")}
                             onMouseLeave={() => this.mlOpac("scratch4")}/>
                        <text onClick={() => this.scratch(0,1)}
                              onMouseOver={() => this.mOpac("scratch4")}
                              onMouseLeave={() => this.mlOpac("scratch4")}>{hid[0][1] ? val[0][1] : ' '}</text>
                        {'\t'}
                        <img src={require('./scratch.png')} onClick={() => this.scratch(1,1)} className="Scratch"
                             alt="" id="scratch5"
                             onMouseOver={() => this.mOpac("scratch5")}
                             onMouseLeave={() => this.mlOpac("scratch5")}/>
                        <text onClick={() => this.scratch(1,1)}
                              onMouseOver={() => this.mOpac("scratch5")}
                              onMouseLeave={() => this.mlOpac("scratch5")}>{hid[1][1] ? val[1][1] : ' '}</text>
                        {'\t'}
                        <img src={require('./scratch.png')} onClick={() => this.scratch(2,1)} className="Scratch"
                             alt="" id="scratch6"
                             onMouseOver={() => this.mOpac("scratch6")}
                             onMouseLeave={() => this.mlOpac("scratch6")}/>
                        <text onClick={() => this.scratch(2,1)}
                              onMouseOver={() => this.mOpac("scratch6")}
                              onMouseLeave={() => this.mlOpac("scratch6")}>{hid[2][1] ? val[2][1] : '  '}</text>
                        {'\t'}
                    </p>
                    <p>
                        <text onClick={() => this.select(2)} style={{color: 'lightyellow'}}>{tri[2] ? '▶' : '▷'}</text>
                        {'\t'}
                        <img src={require('./scratch.png')} onClick={() => this.scratch(0, 2)} className="Scratch"
                             alt="" id="scratch7"
                             onMouseOver={() => this.mOpac("scratch7")}
                             onMouseLeave={() => this.mlOpac("scratch7")}/>
                        <text onClick={() => this.scratch(0, 2)}
                              onMouseOver={() => this.mOpac("scratch7")}
                              onMouseLeave={() => this.mlOpac("scratch7")}>{hid[0][2] ? val[0][2] : ' '}</text>
                        {'\t'}
                        <img src={require('./scratch.png')} onClick={() => this.scratch(1, 2)} className="Scratch"
                             alt="" id="scratch8"
                             onMouseOver={() => this.mOpac("scratch8")}
                             onMouseLeave={() => this.mlOpac("scratch8")}/>
                        <text onClick={() => this.scratch(1, 2)}
                              onMouseOver={() => this.mOpac("scratch8")}
                              onMouseLeave={() => this.mlOpac("scratch8")}>{hid[1][2] ? val[1][2] : ' '}</text>
                        {'\t'}
                        <img src={require('./scratch.png')} onClick={() => this.scratch(2, 2)} className="Scratch"
                             alt="" id="scratch9"
                             onMouseOver={() => this.mOpac("scratch9")}
                             onMouseLeave={() => this.mlOpac("scratch9")}/>
                        <text onClick={() => this.scratch(2, 2)}
                              onMouseOver={() => this.mOpac("scratch9")}
                              onMouseLeave={() => this.mlOpac("scratch9")}>{hid[2][2] ? val[2][2] : '  '}</text>
                        {'\t'}
                    </p>
                    <p>
                        <button onClick={this.submit}>Confirm</button>
                    </p>
                    <p>
                        {'\t'}
                        <text className="Score">Score: {defaultRewards[selsum - 6]} MGP</text>
                    </p>
                </div>
                <div className="Rules">
                    <p>
                        1. Select Numbers:
                        Every ticket has nine spaces, each numbered randomly from one to nine. At the start, however,
                        eight of these nine spaces will be hidden. To begin, select three numbers from the eight hidden
                        on your ticket.
                    </p>
                    <p>
                        2. Select a Line:
                        Next, select one of eight lines─vertical, horizontal, or diagonal. When selecting a line, the
                        sum of the three numbers in that line will determine the amount of MGP you receive.
                    </p>
                    <p>
                        3. Receive a Prize:
                        After you have selected a line, all the numbers are uncovered and you will receive MGP based on
                        the sum of the line you chose.
                    </p>
                </div>
                <div className="Rewards">

                    <Rewards/>
                    <p>Developed by Anthony Nguyen</p>
                    <a href="https://github.com/Thingon">https://github.com/Thingon</a>
                </div>
            </div>

        );
    }
}

export default Calc;