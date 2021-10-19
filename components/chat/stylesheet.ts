import { StyleSheet } from 'react-native';

import { colors } from '../../config/styles';
import { normalizeSize } from '../../lib/helpers';

export default StyleSheet.create({
  container: {
    backgroundColor: '#E4DDD6',
    flex: 1,
  },
  messageGroupList: {
    flex: 1,
    paddingHorizontal: normalizeSize(24),
  },
  messageGroup: {
    paddingVertical: normalizeSize(12),
    flexDirection: 'column',
    flex: 1,
  },
  messageGroupDateWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageGroupDate: {
    backgroundColor: '#E5F3FA',
    borderRadius: normalizeSize(10),
    fontSize: normalizeSize(14),
    paddingVertical: normalizeSize(8),
    paddingHorizontal: normalizeSize(10),
    textAlign: 'center',
  },
  messageGroupDivider: {
    backgroundColor: '#E5F3FA',
    height: normalizeSize(2),
    flex: 1,
    marginHorizontal: normalizeSize(8),
  },
  controls: {
    backgroundColor: colors.lightGrey,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: normalizeSize(12),
    paddingHorizontal: normalizeSize(24),
  },
  messageInput: {
    flex: 1,
    backgroundColor: 'white',
    color: colors.black,
    fontSize: normalizeSize(16),
    borderRadius: normalizeSize(12),
    paddingHorizontal: normalizeSize(12),
    paddingVertical: normalizeSize(8),
  },
  controlsIcon: {
    color: colors.chatIcon,
    fontSize: normalizeSize(24),
    marginLeft: normalizeSize(16),
  },
  messagesList: {
    flex: 1,
    flexDirection: 'column',
  },
  message: {
    color: colors.black,
    backgroundColor: 'white',
    fontSize: normalizeSize(16),
    paddingVertical: normalizeSize(8),
    paddingHorizontal: normalizeSize(10),
    borderRadius: normalizeSize(10),
    marginTop: normalizeSize(10),
    flexDirection: 'column',
    minWidth: normalizeSize(100),
    alignSelf: 'flex-start',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  messageLocal: {
    backgroundColor: '#E1F7CB',
    alignSelf: 'flex-end',
  },
  messageTime: {
    fontSize: normalizeSize(12),
    color: '#919191',
    lineHeight: normalizeSize(12),
    textAlign: 'right',
  },
});
