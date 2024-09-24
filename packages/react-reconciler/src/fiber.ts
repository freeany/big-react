import { Props, Key, Ref } from 'shared/ReactTypes';
import { WorkTag } from './workTags';
import { Flags, NoFlags } from './fiberFlags';
// hostconfig对应不同的宿主环境
import { Container } from 'hostConfig';

// 构造fiber节点
export class FiberNode {
	type: any;
	tag: WorkTag;
	pendingProps: Props;
	key: Key;
	stateNode: any;
	ref: Ref;

	return: FiberNode | null;
	sibling: FiberNode | null;
	child: FiberNode | null;
	index: number;

	memoizedProps: Props | null;
	memoizedState: any;
	alternate: FiberNode | null;
	flags: Flags;
	updateQueue: unknown;

	constructor(tag: WorkTag, pendingProps: Props, key: Key) {
		// ------ 作为静态数据 ------
		this.tag = tag; // 标记不同的组件类型
		this.key = key; // key属性
		// HostComponent <div> div DOM
		this.stateNode = null; // 真实dom节点, 如类组件的实例、原生 dom 实例, 而 function 组件没有实例, 因此该属性是空
		// FunctionComponent () => {}
		this.type = null;

		// ------ 构成fiber树状结构相关 ------
		this.return = null; // 指向父fiberNode
		this.sibling = null; // 指向右边的兄弟fiberNode
		this.child = null; // 只想子fiberNode
		this.index = 0; // 所在的索引

		this.ref = null;

		// ------ 作为工作单元计算state ------
		this.pendingProps = pendingProps; // 刚开始工作的时候的props是什么
		this.memoizedProps = null; // 工作完确定下来以后的props是什么
		this.memoizedState = null;
		this.updateQueue = null;

		// ------ 副作用 ------
		this.flags = NoFlags;

		// ------ 其他 ------
		this.alternate = null; // 两颗fiber树会互相切换，如果当前的fiberNode是currtent，那么alternate指向的就是workInProgress，如果当前的fiberNode是workInProgress，那么alternate指向的就是currtent
	}
}

// 应用统一根node
export class FiberRootNode {
	container: Container;
	current: FiberNode; // 指向hostRootFiber
	finishedWork: FiberNode | null; // 更新完成后的hostRootFiber
	constructor(container: Container, hostRootFiber: FiberNode) {
		this.container = container;
		this.current = hostRootFiber;
		hostRootFiber.stateNode = this;
		this.finishedWork = null;
	}
}

// 当前在屏幕中显示的内容对应的 Fiber 树叫做 current Fiber 树
// 当发生更新时，React 会在内存中重新构建一颗新的 Fiber 树，这颗正在构建的 Fiber 树叫做 workInProgress(wip) Fiber 树。
export const createWorkInProgress = (
	current: FiberNode,
	pendingProps: Props
): FiberNode => {
	let wip = current.alternate;

	// 如果不存在，那么创建wip fiber，进行挂载操作
	if (wip === null) {
		// mount
		wip = new FiberNode(current.tag, pendingProps, current.key);
		wip.stateNode = current.stateNode;

		wip.alternate = current;
		current.alternate = wip;
	} else {
		// update
		wip.pendingProps = pendingProps;
		wip.flags = NoFlags;
	}
	wip.type = current.type;
	wip.updateQueue = current.updateQueue;
	wip.child = current.child;
	wip.memoizedProps = current.memoizedProps;
	wip.memoizedState = current.memoizedState;

	return wip;
};
