import * as MRE from '@microsoft/mixed-reality-extension-sdk';

export default class HelloWorld {

	private item1: MRE.Actor = null;
	private assets: MRE.AssetContainer;
	constructor(private context: MRE.Context) {
		this.context.onStarted(() => this.started());
	}

	private started() {

		this.assets = new MRE.AssetContainer(this.context);
		this.item1 = MRE.Actor.CreateFromLibrary(this.context,{
			resourceId:'artifact:2049839500896502375'
		})
		this.item1.grabbable = true;

		// 在这里,我们为文本演员创建一个动画.首先,我们创建动画数据,可以在任何演员身上使用.我们将用占位符“objectA”引用该演员
		const spinAnimData = this.assets.createAnimationData(
			// 该名称是此数据的唯一标识符,您可以使用它在资产容器中查找数据，但在本示例中它只是描述性的
			"Spin",
			{
				// 动画数据由动画“轨迹”列表定义:要更改的特定特性以及要将其更改为的值
				tracks: [{  // tracks : 轨迹
					// 此动画设定名为“objectA”的演员旋转
					target: MRE.ActorPath("objectA").transform.local.rotation,
					// 旋转时间将设定为20秒
					keyframes: this.generateSpinKeyframes(20, MRE.Vector3.Up()),
					// 它将平稳地从一帧移动到下一帧
					easing: MRE.AnimationEaseCurves.Linear
				}]
			});

		// 一旦创建了动画数据，我们就可以从中创建真实的动画
		spinAnimData.bind(
			// We assign our text actor to the actor placeholder "objectA"
			{ objectA: this.item1 },
			// 并将其设置为立即播放，从开始到结束来回反弹
			{ isPlaying: true, wrapMode: MRE.AnimationWrapMode.PingPong }
		);	


	}

	/**
	 * Generate keyframe data for a simple spin animation.
	 * @param duration The length of time in seconds it takes to complete a full revolution.
	 * @param axis The axis of rotation in local space.
	 */
	private generateSpinKeyframes(duration: number, axis: MRE.Vector3): Array<MRE.Keyframe<MRE.Quaternion>> {
		return [{
			time: 0 * duration,
			value: MRE.Quaternion.RotationAxis(axis, 0)
		}, {
			time: 0.25 * duration,
			value: MRE.Quaternion.RotationAxis(axis, Math.PI / 2)
		}, {
			time: 0.5 * duration,
			value: MRE.Quaternion.RotationAxis(axis, Math.PI)
		}, {
			time: 0.75 * duration,
			value: MRE.Quaternion.RotationAxis(axis, 3 * Math.PI / 2)
		}, {
			time: 1 * duration,
			value: MRE.Quaternion.RotationAxis(axis, 2 * Math.PI)
		}];
	}
	
}
