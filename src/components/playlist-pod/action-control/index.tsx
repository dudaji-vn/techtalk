import ActivedLoopIcon from "@/assets/icon/active-loop-icon.svg";
import DisableNextIcon from "@/assets/icon/disable-next-icon.svg";
import DisablePreviosIcon from "@/assets/icon/disable-previous-icon.svg";
import LectureListIcon from "@/assets/icon/lecture-list-icon.svg";
import LoopIcon from "@/assets/icon/loop-icon.svg";
import NextIcon from "@/assets/icon/next-icon.svg";
import PauseIcon from "@/assets/icon/pause-icon.svg";
import PlayIcon from "@/assets/icon/play-icon.svg";
import PreviosIcon from "@/assets/icon/previos-icon.svg";
import { useAppDispatch, useAppSelector } from "@/core/store";
import { updateIndexListenPage, updateIsPlaying } from "@/core/store/index";
import { RecordTypeResponse, UserResponseType } from "@/core/type";
import ROUTER from "@/shared/const/router.const";
import { AlertTitle, Avatar, Box, IconButton, Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface ActionControlRef {
  onHandlePlayAudioBySelectUser: Function;
  setIndexPlaying: Function;
}

interface ActionControlPlaylistProps {
  usersRecord: (UserResponseType & RecordTypeResponse & { isPlaying: boolean; isPlayed: boolean })[];
  setUsersRecord: Function;
  onNextSlideIndex: Function;
}

const ActionControlPlaylist = forwardRef(({ usersRecord, setUsersRecord, onNextSlideIndex }: ActionControlPlaylistProps, ref) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const currentIndex = useAppSelector((state) => state.GlobalStore.listenPage.currentLectureIndex);
  const totalLecture = useAppSelector((state) => state.GlobalStore.listenPage.totalLecture);
  const isTheLastVocabulary = useAppSelector((state) => state.GlobalStore.listenPage.isTheLastVocabulary);
  const isPlayingStatus = useAppSelector((state) => state.GlobalStore.listenSetting.isPlaying);

  const [indexPlaying, setIndexPlaying] = useState(0);
  const [isLoop, setIsLoop] = useState(false);
  const audioElement = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined = undefined;
    if (usersRecord.length === 0 && isPlayingStatus) {
      timer = setTimeout(() => {
        if (currentIndex < totalLecture - 1) {
          dispatch(updateIndexListenPage(1));
        } else {
          dispatch(updateIsPlaying(false));
        }
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersRecord, isPlayingStatus]);

  const onHandleToNewLecture = (isNext: boolean) => {
    if (isNext) {
      if (currentIndex < totalLecture - 1) {
        dispatch(updateIndexListenPage(1));
      }
    } else {
      if (currentIndex >= 1) {
        dispatch(updateIndexListenPage(-1));
      }
    }
    dispatch(updateIsPlaying(true));
  };

  const getNewUserRecord = (currentIndex: number, isEnded?: boolean) => {
    if (isEnded) {
      const newUserRecord = [...usersRecord];
      newUserRecord[currentIndex].isPlaying = false;
      return newUserRecord;
    }

    const newUserRecord = usersRecord.map((user, index) => {
      if (currentIndex === index) {
        return { ...user, isPlaying: true };
      }
      return { ...user, isPlaying: false };
    });
    return newUserRecord;
  };

  const onHandlePlayAudio = (isPlaying: boolean, nextIndex?: number) => {
    const index = nextIndex ?? indexPlaying;
    setIndexPlaying(index);
    dispatch(updateIsPlaying(isPlaying));
    setUsersRecord(getNewUserRecord(index));
  };

  const onHandleEndAudio = () => {
    const nextIndex = indexPlaying + 1;

    if (isLoop) {
      if (nextIndex < usersRecord.length) {
        onHandlePlayAudio(true, nextIndex);
      } else {
        onHandlePlayAudio(true, 0);
      }
      return;
    }

    if (nextIndex < usersRecord.length) {
      onHandlePlayAudio(true, nextIndex);
    } else {
      if (isTheLastVocabulary) {
        setIndexPlaying(() => 0);
        setUsersRecord(getNewUserRecord(usersRecord.length - 1, true));
        dispatch(updateIsPlaying(false));

        if (currentIndex < totalLecture - 1) {
          dispatch(updateIndexListenPage(1));
          dispatch(updateIsPlaying(true));
        }
      } else {
        onNextSlideIndex();
      }
    }
  };

  useImperativeHandle(ref, () => ({
    onHandlePlayAudioBySelectUser: (nextIndex: number) => {
      if (!usersRecord.length) return;

      onHandlePlayAudio(true, nextIndex);
    },
    setIndexPlaying,
  }));

  useEffect(() => {
    if (audioElement.current) {
      if (isPlayingStatus) {
        audioElement.current.play().catch((error) => {
          console.log(error);
        });
      } else {
        audioElement.current.pause();
      }
    }
  }, [indexPlaying, isPlayingStatus, usersRecord]);

  const isShowPauseIcon = () => {
    if (!usersRecord || usersRecord.length === 0) {
      if (isPlayingStatus && currentIndex !== totalLecture - 1) {
        return true;
      }
      return false;
    }
    return isPlayingStatus;
  };

  return (
    <Box className="flex justify-around py-4" ref={ref}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={isPlayingStatus && usersRecord.length === 0}
        autoHideDuration={3000}
      >
        <Alert elevation={6} severity="info">
          <AlertTitle
            sx={{
              margin: 0,
            }}
          >
            Skip it because of no record
          </AlertTitle>
        </Alert>
      </Snackbar>
      {usersRecord.length ? (
        <audio
          ref={audioElement}
          autoPlay={isPlayingStatus}
          src={usersRecord[indexPlaying]?.voiceSrc}
          onEnded={onHandleEndAudio}
        />
      ) : null}
      <IconButton onClick={() => setIsLoop((preVal) => !preVal)}>
        <Avatar src={isLoop ? ActivedLoopIcon : LoopIcon} alt="wave-icon" className="w-6 h-6" />
      </IconButton>
      <IconButton onClick={() => onHandleToNewLecture(false)}>
        <Avatar src={currentIndex >= 1 ? PreviosIcon : DisablePreviosIcon} alt="wave-icon" className="w-6 h-6" />
      </IconButton>
      <IconButton
        disabled={currentIndex === totalLecture - 1 && usersRecord.length === 0}
        className="bg-primary w-12 h-12"
        onClick={() => onHandlePlayAudio(!isPlayingStatus)}
      >
        <Avatar src={isShowPauseIcon() ? PauseIcon : PlayIcon} alt="wave-icon" className="w-6 h-6" />
      </IconButton>
      <IconButton onClick={() => onHandleToNewLecture(true)}>
        <Avatar src={currentIndex < totalLecture - 1 ? NextIcon : DisableNextIcon} alt="wave-icon" className="w-6 h-6" />
      </IconButton>
      <IconButton
        onClick={() => {
          navigate(ROUTER.LISTENING + ROUTER.SELECT_LECTURE);
        }}
      >
        <Avatar variant="square" src={LectureListIcon} alt="wave-icon" className="w-6 h-6" />
      </IconButton>
    </Box>
  );
});

export default ActionControlPlaylist;
