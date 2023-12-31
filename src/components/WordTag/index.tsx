import { Avatar, Checkbox, Grid, Typography } from "@mui/material";
import AudioPlayer from "../AudioPlayer";
import { useNavigate } from "react-router-dom";
import ROUTER from "@/shared/const/router.const";
import SpeakerIcon from "@/assets/icon/volume-icon.svg";
import SpeakerFillIcon from "@/assets/icon/volume-fill-icon.svg";
import useAudio from "@/shared/hook/useAudio";
interface WordTagPropType {
  sentence: string;
  phonetic: string;
  classes: string;
  voiceSrc: string;
  lectureName: string;
  lectureId: string;
  vocabularyId: string;
  recordId: string;
}
export default function WordTag({ sentence, phonetic, classes, voiceSrc, lectureName, lectureId, vocabularyId, recordId }: WordTagPropType) {
  const navigate = useNavigate();

  const [playing, toggle] = useAudio();

  const onHandleRerecod = () => {
    navigate(
      {
        pathname: ROUTER.RERECORD + `/${lectureName.toLowerCase()}`,
      },
      {
        state: {
          vocabularyId,
          lectureId,
          recordId,
        },
      }
    );
  };

  return (
    <Grid container gap={1} className={`p-4 bg-white ${classes}`}>
      <Grid item xs={1}>
        {/* <AudioPlayer voiceSrc={voiceSrc} /> */}
        <Checkbox onClick={() => toggle()} icon={<Avatar src={SpeakerIcon} className='w-5 h-5' />} checkedIcon={<Avatar src={SpeakerFillIcon} className='w-5 h-5' />} />
      </Grid>
      <Grid item xs={10} onClick={onHandleRerecod}>
        <Typography className='text-small-medium'>{sentence}</Typography>
      </Grid>
      <Grid item xs={1} className='invisible'>
        {/* pesudo tag */}
      </Grid>
      <Grid item xs={10} onClick={onHandleRerecod}>
        <Typography variant='body2' className='text-small-regular'>
          {phonetic}
        </Typography>
      </Grid>
    </Grid>
  );
}
