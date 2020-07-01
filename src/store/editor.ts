import { TopicData } from 'xmind-model/types/models/topic';
import {
  getLeftNode,
  HierachyNodeWithTopicData,
  getRighttNode,
  getTopNode,
  getBottomNode,
} from '../utils/tree';
import { createStore } from 'relax-ts';
import { EDITOR_MODE } from '../constant';

type IState = {
  mode: EDITOR_MODE;
  selectedNodeId: string;
  scale: number;
  dragingNode?: TopicData;
};

const initialState: IState = {
  mode: EDITOR_MODE.regular,
  selectedNodeId: '',
  scale: 1,
  dragingNode: undefined,
};

const store = createStore({
  state: initialState,
  reducers: {
    SET_MODE(state, payload: EDITOR_MODE) {
      state.mode = payload;
    },
    SELECT_NODE(state, payload: string) {
      state.selectedNodeId = payload;
    },
    DRAG_NODE(state, payload: TopicData) {
      state.dragingNode = payload;
    },
    SET_SCALE(state, payload: number) {
      state.scale = payload;
    },
    MOVE_LEFT(state, rootWithCoords: HierachyNodeWithTopicData) {
      const target = getLeftNode(rootWithCoords, state.selectedNodeId);
      if (target) {
        state.selectedNodeId = target.data.id;
      }
    },
    MOVE_RIGHT(state, rootWithCoords: HierachyNodeWithTopicData) {
      const target = getRighttNode(rootWithCoords, state.selectedNodeId);
      if (target) {
        state.selectedNodeId = target.data.id;
      }
    },
    MOVE_TOP(state, rootWithCoords: HierachyNodeWithTopicData) {
      const target = getTopNode(rootWithCoords, state.selectedNodeId);
      if (target) {
        state.selectedNodeId = target.data.id;
      }
    },
    MOVE_DOWN(state, rootWithCoords: HierachyNodeWithTopicData) {
      const target = getBottomNode(rootWithCoords, state.selectedNodeId);
      if (target) {
        state.selectedNodeId = target.data.id;
      }
    },
  },
  effects: {},
});

export default store;
