/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as MRE from '@microsoft/mixed-reality-extension-sdk';

/**
 * 此应用程序的主类。所有的逻辑都在这里
 */
export default class HelloWorld {
	private text: MRE.Actor = null;
	private cube: MRE.Actor = null;
	private assets: MRE.AssetContainer;
	// Container for an application session. The Context contains all application state for a session of your application. This includes Actors, Users, Assets, and other state.
	// 应用程序会话的容器。Context包含应用程序会话的所有应用程序状态。这包括参与者、用户、资产和其他状态。
	constructor(private context: MRE.Context) {
		// Context完全初始化并准备好让应用程序逻辑开始执行后，将引发onStarted事件
		this.context.onStarted(() => this.started());
	}


	private started() {
		
		this.assets = new MRE.AssetContainer(this.context);
		this.cube = MRE.Actor.CreateFromLibrary(this.context,{
			resourceId:'artifact:2044817928523613147'
		})
		this.cube.grabbable = true;

		let golo = this.text
		const context = this.context
		const localAsset = this.assets
		const localGenerateSpinKeyframes = this.generateSpinKeyframes(20, MRE.Vector3.Up())

		this.cube.onGrab('begin',function(){
			console.log('grab begin');
			golo.destroy();
			// 创建一个没有网格,但有文字的新演员
			golo = MRE.Actor.Create(context, {
				actor: {
					name: 'Text',
					transform: {
						app: { position: { x: 0, y: 0.5, z: 0 } }
					},
					text: {
						contents: "一个来自于乾隆的青花瓷",
						anchor: MRE.TextAnchorLocation.MiddleCenter,
						color: { r: 30 / 255, g: 206 / 255, b: 213 / 255 },
						height: 0.1
					}
				}
			});

			// 在这里,我们为文本演员创建一个动画.首先,我们创建动画数据,可以在任何演员身上使用.我们将用占位符“text”引用该演员
			const spinAnimData = localAsset.createAnimationData(
				// The name is a unique identifier for this data. You can use it to find the data in the asset container,
				// but it's merely descriptive in this sample.
				// 该名称是此数据的唯一标识符,您可以使用它在资产容器中查找数据，但在本示例中它只是描述性的
				"Spin",
				{
					// Animation data is defined by a list of animation "tracks": a particular property you want to change,
					// and the values you want to change it to.
					// 动画数据由动画“轨迹”列表定义:要更改的特定特性以及要将其更改为的值
					tracks: [{  // tracks : 轨迹
						// This animation targets the rotation of an actor named "text"
						// 此动画设定名为“text”的演员旋转
						target: MRE.ActorPath("text").transform.local.rotation,
						// And the rotation will be set to spin over 20 seconds
						// 旋转时间将设定为20秒
						keyframes: localGenerateSpinKeyframes,
						// And it will move smoothly from one frame to the next
						// 它将平稳地从一帧移动到下一帧
						easing: MRE.AnimationEaseCurves.Linear
					}]
				});
			// 一旦创建了动画数据，我们就可以从中创建真实的动画
			spinAnimData.bind(
				// We assign our text actor to the actor placeholder "text"
				{ text: golo },
				// And set it to play immediately, and bounce back and forth from start to end
				// 并将其设置为立即播放，从开始到结束来回反弹
				{ isPlaying: true, wrapMode: MRE.AnimationWrapMode.PingPong });	
		})

		this.cube.onGrab('end',function(){
			console.log('grab end');
			golo.destroy();
		})
		
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
