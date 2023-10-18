import BoxCard from "@/components/BoxCard";
import { Avatar, Box, Container, Divider, Grid, IconButton, Typography } from "@mui/material";
import SpeakingIcon from "@/assets/icon/speaking-icon.svg";
import Vietnamflag from "@/assets/icon/vietnam-flag-icon.svg";
import RecordingAudio from "@/components/RecordingAudio";
import { VocabularyTypeResponse, EnrollmentResponseType, NativeVocabularyTypeResponse } from "@/core/type";

export default function TranslationCard(props: VocabularyTypeResponse & EnrollmentResponseType & NativeVocabularyTypeResponse & { totalStep: number }) {
  const { enrollmentId, vocabularyId, currentStep, totalStep } = props;
  const audio = new Audio("props");
  const onRepeat = () => {
    audio.play();
  };
  return (
    <Container id='translationCard' className='py-4 bg-gray-100 flex flex-col grow justify-between'>
      <Box>
        <BoxCard classes='p-4'>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography className='text-small-medium'>{props.vtitleDisplayLanguage}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2' className='text-small-regular'>
                {props.vphoneticDisplayLanguage}
              </Typography>
            </Grid>
            <Grid item xs={12} className='py-4'>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <IconButton onClick={onRepeat}>
                <Avatar src={SpeakingIcon} alt='speaking-icon' className='w-10 h-10' />
              </IconButton>
            </Grid>
          </Grid>
        </BoxCard>

        <Box className='flex gap-1 mt-4'>
          <Avatar alt='national-flag-icon' src={Vietnamflag} className='w-4 h-4 mt-1' />
          <Typography variant='body2' className='text-small-regular'>
            {props.titleNativeLanguage}
          </Typography>
        </Box>
      </Box>
      <RecordingAudio {...{ enrollmentId, vocabularyId, currentStep, totalStep }} />
    </Container>
  );
}
