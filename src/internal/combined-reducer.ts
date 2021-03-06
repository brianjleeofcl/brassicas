import { combineReducers } from 'redux';
import score from './reducers/score';
import board from './reducers/board';
import card from './reducers/cards';
import joker from './reducers/joker';
import selected from './reducers/selected-count';
import remaining from './reducers/remaining';
import gameOver from './reducers/game-over';
import isShuffling from './reducers/shuffling';
import { State } from './state';
import { CabbageCard, BroccoliCard, CauliflowerCard, RedCabbageCard, BrusselsSproutCard, RomanescoCard } from './card';

export default combineReducers<State | undefined>({ 
  score,
  board,
  selected,
  remaining,
  gameOver,
  isShuffling,
  a1: card(CabbageCard, 'a1'),
  a2: card(CabbageCard, 'a2'),
  a3: card(CabbageCard, 'a3'),
  a4: card(CabbageCard, 'a4'),
  b1: card(BroccoliCard, 'b1'),
  b2: card(BroccoliCard, 'b2'),
  b3: card(BroccoliCard, 'b3'),
  b4: card(BroccoliCard, 'b4'),
  c1: card(CauliflowerCard, 'c1'),
  c2: card(CauliflowerCard, 'c2'),
  c3: card(CauliflowerCard, 'c3'),
  c4: card(CauliflowerCard, 'c4'),
  d1: card(RedCabbageCard, 'd1'),
  d2: card(RedCabbageCard, 'd2'),
  d3: card(RedCabbageCard, 'd3'),
  d4: card(RedCabbageCard, 'd4'),
  e1: card(BrusselsSproutCard, 'e1'),
  e2: card(BrusselsSproutCard, 'e2'),
  e3: card(BrusselsSproutCard, 'e3'),
  e4: card(BrusselsSproutCard, 'e4'),
  f1: card(RomanescoCard, 'f1'),
  f2: card(RomanescoCard, 'f2'),
  f3: card(RomanescoCard, 'f3'),
  f4: card(RomanescoCard, 'f4'),
  g1: joker('g1')
});
