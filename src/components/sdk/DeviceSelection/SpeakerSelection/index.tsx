// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React, { useState, useEffect } from 'react';

import { useMeetingManager } from '../../../../providers/MeetingProvider';
import { useAudioOutputs } from '../../../../providers/DevicesProvider';
import DeviceInput from '../DeviceInput';

interface Props {
  /** The message that will be shown when no audio output speaker devices are found. */
  notFoundMsg?: string;
  /** The label that will be shown for speaker selection, it defaults to `Speaker source`. */
  label?: string;
  /** The callback fired when the selection is changed. It is required if you want to add testing functionality around speaker selection. */
  onChange?: (selectedAudioOutputDeviceId: string) => void;
}

export const SpeakerSelection: React.FC<Props> = ({
  notFoundMsg = 'No speaker devices found',
  label = 'Speaker source',
  onChange
}) => {
  const meetingManager = useMeetingManager();
  const { devices } = useAudioOutputs();
  const [selectedOutput, setSelectedOutput] = useState('');

  useEffect(() => {
    if (!devices.length || selectedOutput) {
      return;
    }

    setSelectedOutput(devices[0].deviceId);
  }, [selectedOutput, devices]);

  async function selectAudioOutput(deviceId: string) {
    setSelectedOutput(deviceId);
    meetingManager.selectAudioOutputDevice(deviceId);
    onChange && onChange(deviceId);
  }

  return (
    <DeviceInput
      label={label}
      devices={devices}
      onChange={selectAudioOutput}
      notFoundMsg={notFoundMsg}
    />
  );
};

export default SpeakerSelection;
