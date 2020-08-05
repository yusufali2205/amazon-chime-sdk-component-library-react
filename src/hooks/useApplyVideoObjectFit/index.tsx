import { useEffect, RefObject } from 'react';

export function useApplyVideoObjectFit(videoEl: RefObject<HTMLVideoElement>) {
  useEffect(() => {
    function onLoaded() {
      if (!videoEl.current) {
        return;
      }

      const height = videoEl.current.videoHeight;
      const width = videoEl.current.videoWidth;

      console.log('LOAD EVENT');
      console.log(height, width);

      videoEl.current.style.objectFit = height > width ? 'contain' : 'cover';
    }

    videoEl.current?.addEventListener('loadedmetadata', onLoaded);

    return () =>
      videoEl.current?.removeEventListener('loadedmetadata', onLoaded);
  }, []);
}

export default useVideoRatioType;
