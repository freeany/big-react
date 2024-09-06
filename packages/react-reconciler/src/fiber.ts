import { Props, Key, Ref } from 'shared/ReactTypes';
import { WorkTag } from './workTags';
import { Flags, Noflags } from './fiberFlags';

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
	alternate: FiberNode | null;
	flags: Flags;

	constructor(tag: WorkTag, pendingProps: Props, key: Key) {
		// 实例
		this.tag = tag;
		this.key = key;
		// HostComponent <div> div DOM
		this.stateNode = null;
		// FunctionComponent () => {}
		this.type = null;

		// 构成树状结构
		this.return = null; // 指向父fiberNode
		this.sibling = null; // 指向右边的兄弟fiberNode
		this.child = null; // 只想子fiberNode
		this.index = 0; // 所在的索引

		this.ref = null;

		// 作为工作单元
		this.pendingProps = pendingProps; // 刚开始工作的时候的props是什么
		this.memoizedProps = null; // 工作完确定下来以后的props是什么

		this.alternate = null; // 两颗fiber树会互相切换，如果当前的fiberNode是currtent，那么alternate指向的就是workInProgress，如果当前的fiberNode是workInProgress，那么alternate指向的就是currtent
		// 副作用
		this.flags = Noflags;
	}
}
