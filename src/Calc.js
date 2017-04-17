/**
 * Created by Anthony on 4/12/2017.
 */
import React, { Component } from 'react';
import './Calc.css';

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

var defaultRewards = [10000,36,720,360,80,252,108,72,54,180,72,180,119,36,306,1080,144,1800,3600]

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
                [1,1,1],
                [1,1,1],
                [1,1,1]
            ]
        }
        selsum = sums[sel];
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
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
    render() {
        return (
            <div className="Calc">
                <p>
                    {'\t'}
                    <text onClick={() => this.select(6)}>{tri[6] ? '▲' : '△'}</text>
                    {'\t'}
                    <text onClick={() => this.select(3)}>{tri[3] ? '▼' : '▽'}</text>
                    {'\t'}
                    <text onClick={() => this.select(4)}>{tri[4] ? '▼' : '▽'}</text>
                    {'\t'}
                    <text onClick={() => this.select(5)}>{tri[5] ? '▼' : '▽'}</text>
                    {'\t'}
                    <text onClick={() => this.select(7)}>{tri[7] ? '▲' : '△'}</text>
                </p>
                <p>
                    <text onClick={() => this.select(0)}>{tri[0] ? '▶' : '▷'}</text>
                    {'\t'}
                    <text onClick={() => this.scratch(0,0)}>{hid[0][0] ? val[0][0] : 'X'}</text>
                    {'\t'}
                    <text onClick={() => this.scratch(1,0)}>{hid[1][0] ? val[1][0] : 'X'}</text>
                    {'\t'}
                    <text onClick={() => this.scratch(2,0)}>{hid[2][0] ? val[2][0] : 'X'}</text>
                </p>
                <p>
                    <text onClick={() => this.select(1)}>{tri[1] ? '▶' : '▷'}</text>
                    {'\t'}
                    <text onClick={() => this.scratch(0,1)}>{hid[0][1] ? val[0][1] : 'X'}</text>
                    {'\t'}
                    <text onClick={() => this.scratch(1,1)}>{hid[1][1] ? val[1][1] : 'X'}</text>
                    {'\t'}
                    <text onClick={() => this.scratch(2,1)}>{hid[2][1] ? val[2][1] : 'X'}</text>
                </p>
                <p>
                    <text onClick={() => this.select(2)}>{tri[2] ? '▶' : '▷'}</text>
                    {'\t'}
                    <text onClick={() => this.scratch(0,2)}>{hid[0][2] ? val[0][2] : 'X'}</text>
                    {'\t'}
                    <text onClick={() => this.scratch(1,2)}>{hid[1][2] ? val[1][2] : 'X'}</text>
                    {'\t'}
                    <text onClick={() => this.scratch(2,2)}>{hid[2][2] ? val[2][2] : 'X'}</text>
                </p>
                <p>
                    <button onClick={this.random}>Start</button>
                    <button onClick={this.submit}>Submit</button>
                </p>
                <p>
                    {defaultRewards[selsum-6]}
                </p>
            </div>

        );
    }
}

export default Calc;