// <script type="text/javascript">

var tomove;
var thinking;
var pickedup;
var board;
var red;
var blue;
var won = [ -1,-1,-1 ];
var ids = [ 'A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3' ];

function TurnRed(id)
{
    block=document.getElementById(id);
    block.style.backgroundColor="#FF0000";
}

function TurnBlue(id)
{
    block=document.getElementById(id);
    block.style.backgroundColor="#0000FF";
}

function TurnGrey(id)
{
    block=document.getElementById(id);
    block.style.backgroundColor="#777777";
}

function ClearBoard()
{
    TurnGrey('A1');
    TurnGrey('A2');
    TurnGrey('A3');
    TurnGrey('B1');
    TurnGrey('B2');
    TurnGrey('B3');
    TurnGrey('C1');
    TurnGrey('C2');
    TurnGrey('C3');
    tomove=1;
    thinking=0;
    red=0;
    blue=0;
    pickedup=-1;
    board = [ 0,0,0,0,0,0,0,0,0 ];
}

// Helpers

function FlashWinningOn()
{
    if(board[won[0]]==1) {
        TurnRed(ids[won[0]]);
        TurnRed(ids[won[1]]);
        TurnRed(ids[won[2]]);
    } else {
        TurnBlue(ids[won[0]]);
        TurnBlue(ids[won[1]]);
        TurnBlue(ids[won[2]]);
    }
    window.setTimeout(FlashWinningOff,100);
}

function FlashWinningOff()
{
    TurnGrey(ids[won[0]]);
    TurnGrey(ids[won[1]]);
    TurnGrey(ids[won[2]]);
    window.setTimeout(FlashWinningOn,100);
}


function CheckWinning()
{
   if(red==3 || blue==3) {
      if(board[0]>0 && board[0]==board[1] && board[1]==board[2]) won=[0,1,2];
      if(board[3]>0 && board[3]==board[4] && board[4]==board[5]) won=[3,4,5];
      if(board[6]>0 && board[6]==board[7] && board[7]==board[8]) won=[6,7,8];
      if(board[0]>0 && board[0]==board[3] && board[3]==board[6]) won=[0,3,6];
      if(board[0]>0 && board[0]==board[4] && board[4]==board[8]) won=[0,4,8];
      if(board[1]>0 && board[1]==board[4] && board[4]==board[7]) won=[1,4,7];
      if(board[2]>0 && board[2]==board[5] && board[5]==board[8]) won=[2,5,8];
      if(board[2]>0 && board[2]==board[4] && board[4]==board[6]) won=[2,4,6];
      if(won[0]>-1) {
          thinking=1;
          FlashWinningOn();
      }
   }
}

// Actions
function PlayerClick(id,index)
{
    if(thinking==0) {
        if(tomove==1) {
            if(red<3) {
                if(board[index]==0) {
                    TurnRed(id);
                    board[index]=1;
                    red++;
                    if(pickedup!=index) {
                        tomove=2;
                    }
                    pickedup=-1;
                }
            } else {
                if(board[index]==1) {
                    TurnGrey(id);
                    board[index]=0;
                    red--;
                    pickedup=index;
                }
            }
        } else {
            if(blue<3) {
                if(board[index]==0) {
                    TurnBlue(id);
                    board[index]=2;
                    blue++;
                    if(pickedup!=index) {
                        tomove=1;
                    }
                    pickedup=-1;                }
            } else {
                if(board[index]==2) {
                    TurnGrey(id);
                    board[index]=0;
                    blue--;
                    pickedup=index;
                }
            }
        }
    }
    CheckWinning();
}

function ButtonA1()
{
    PlayerClick('A1',0);
}

function ButtonA2()
{
    PlayerClick('A2',1);
}

function ButtonA3()
{
    PlayerClick('A3',2);
}

function ButtonB1()
{
    PlayerClick('B1',3);
}

function ButtonB2()
{
    PlayerClick('B2',4);
}

function ButtonB3()
{
    PlayerClick('B3',5);
}

function ButtonC1()
{
    PlayerClick('C1',6);
}

function ButtonC2()
{
    PlayerClick('C2',7);
}

function ButtonC3()
{
    PlayerClick('C3',8);
}


// Setup
function Start()
{
    ClearBoard();
}