import {useEffect, useRef, useState} from 'react';
import {MpSdk} from '@matterport/sdk';

const appKey = 'xtet8rr5t5i42rwanintd7rzb';

export const Showcase = ({modelId, containerClassName, className}) => {
  const [sdk, setSdk] = useState(null);
  const [started, setStarted] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadSDK = async () => {
      // Dynamically import to Avoid SSR / ReferenceError: self is not defined
      const {setupSdk} = await import('@matterport/sdk');
      const currentContainer = container.current;
      const hasChildNodes = currentContainer.hasChildNodes();
      const frames = document.getElementsByTagName('iframe');

      //TODO: hasChildNodes() does not return IFrame children. frames.length is allways 0
      if (frames != null) {
        const length = frames.length;
        console.log('frames length: ', length);
        console.log('frames: ', frames);
      }

      console.log('started: ', started);
      console.log('currentContainer: ', currentContainer);
      console.log('hasChildNodes: ', hasChildNodes);

      if (!started && currentContainer) {
        setStarted(true);

        if (!hasChildNodes) {
          await LoadSdkIFrame(setupSdk, currentContainer, modelId);
        }
      }
    };

    loadSDK();
  }, [modelId, sdk, started]);

  const LoadSdkIFrame = async (setupSdk: any, currentContainer: HTMLDivElement, modelId: string) => {
    console.log('Loading SDK...');

    const hasChildNodes = currentContainer.hasChildNodes();
    const frames = document.getElementsByTagName('iframe');

    console.log('LoadSdkIFrame - hasChildNodes: ', hasChildNodes);

    if (frames != null) {
      const length = frames.length;
      console.log('LoadSdkIFrame - frames length: ', length);
    }

    const mpSdk: MpSdk = await setupSdk(appKey, {
      space: modelId,
      container: currentContainer,
      iframeQueryParams: {
        qs: '1',
      },
    });

    setSdk(mpSdk);
    console.log('SDK started.');
    await startApp(mpSdk);
  };

  return (
    <div className={containerClassName}>
      <div className={className} ref={container}></div>
    </div>
  );
};

const startApp = async (mpSdk: MpSdk) => {
  console.log('SDK NPM Package Loaded', mpSdk);
};
