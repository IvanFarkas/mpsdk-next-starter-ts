import {useEffect, useRef, useState} from 'react';
import {MpSdk} from '@matterport/webcomponent';

const appKey = 'xtet8rr5t5i42rwanintd7rzb';

export const WebComponent = ({modelId, containerClassName, className}) => {
  const [sdk, setSdk] = useState<MpSdk>(null);
  const [started, setStarted] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadSdk = async () => {
      // Dynamically import to Avoid SSR / ReferenceError: self is not defined
      const {MpSdk} = await import('@matterport/webcomponent');
      const currentContainer = container.current;
      const hasChildNodes = currentContainer.hasChildNodes();

      if (!started && currentContainer) {
        setStarted(true);

        if (!hasChildNodes) {
          LoadWebComponent(currentContainer, modelId);
        }
      }
    };

    loadSdk();
  }, [modelId, sdk, started]);

  const LoadWebComponent = (currentContainer: HTMLDivElement, modelId: string) => {
    console.log('Loading SDK...');

    const newWebComponent = document.createElement('matterport-viewer');

    newWebComponent.setAttribute('m', modelId);
    newWebComponent.setAttribute('application-key', appKey);
    newWebComponent.setAttribute('qs', '1');
    newWebComponent.setAttribute('asset-base', '/assets');

    currentContainer.appendChild(newWebComponent);

    newWebComponent?.addEventListener('mpSdkPlaying', async (evt: any) => {
      const mpSdk = evt.detail.mpSdk;

      setSdk(mpSdk);
      console.log('SDK is playing.');
      await onSdkPlaying(mpSdk);
    });
  };

  return (
    <div className={containerClassName}>
      <div className={className} ref={container}></div>
    </div>
  );
};

const onSdkPlaying = async (mpSdk: MpSdk) => {
  console.log('WebComponent Connected to the SDK', mpSdk);
};
