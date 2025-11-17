// src/navigation/types.ts

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Tracks: undefined;
  TrackDetail: {
    trackId: string;
  };
  TrackForm: {
    trackId?: string;
  };
  Profile: undefined;
};
