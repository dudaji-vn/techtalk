import BoxCard from "@/components/BoxCard";
import {
  Avatar,
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import SpeakingIcon from "@/assets/icon/speaking-icon.svg";
import Vietnamflag from "@/assets/icon/vietnam-flag-icon.svg";
import RecordingAudio from "@/components/RecordingAudio";
import { VocabularyType } from "@/shared/type";
import { useEffect, useRef } from "react";
import AudioCustom from "../AudioCustom";

export default function TranslationCard(
  props: VocabularyType & { refetch: any }
) {
  const audioEle = useRef<HTMLAudioElement | null>(null);
  const onRepeat = () => {
    if (audioEle && audioEle.current) {
      audioEle.current.play();
    }
  };

  useEffect(() => {
    return () => {
      audioEle.current = null;
    };
  }, []);

  return (
    <Container
      id="translationCard"
      className="py-4 bg-gray-100 flex flex-col grow justify-between"
    >
      <Box>
        <BoxCard classes="p-4">
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography className="text-small-medium">
                {props.titleNativeLanguage}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" className="text-small-regular">
                {props.ipaDisplayLanguage}
              </Typography>
            </Grid>
            <Grid item xs={12} className="py-4">
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <AudioCustom
                voiceSrc={props.voiceRecordSrc}
                icon={SpeakingIcon}
                classes="w-10 h-10"
              />
            </Grid>
          </Grid>
        </BoxCard>

        <Box className="flex gap-1 mt-4">
          <Avatar
            alt="national-flag-icon"
            src={Vietnamflag}
            className="w-4 h-4 mt-1"
          />
          <Typography variant="body2" className="text-small-regular">
            {props.titleDisplayLanguage}
          </Typography>
        </Box>
      </Box>
      <RecordingAudio
        vocabularyId={props.vocabularyId}
        topicId={props.topicId}
        refetch={props.refetch}
      />
    </Container>
  );
}
