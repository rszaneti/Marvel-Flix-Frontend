import React, { useCallback, useContext } from 'react';
import { CircularProgress } from '@material-ui/core';
import { toast } from 'react-toastify';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

// Context
import { useChannelSelectedItems } from '../../context/ChannelSelectedItemsContext';
import { ErrorContext } from '../../context/ErrorContext';
import { useProfile } from '../../context/ProfileContext';
import { useSendMail } from '../../context/SendMailContext';

// Services
import { apiMail } from '../../services/api';

// styles
import { CssTextField } from '../../styles/globalMaterialUi';
import './styles.scss';
import '../../styles/global.scss';

interface IValuesForm {
  name: string;
  email: string;
}

interface IParamTypes {
  data: {
    multiple: boolean;
    channel: string;
    id: number;
    title: string;
    description: string;
    modified: string;
    pageCount: number;
    issueNumber: number;
    thumbnail: string;
    image: string;
    nameChannel: string;
    name: string[];
    active: boolean;
  };
}

const SendMail: React.FC<IParamTypes> = ({ data }) => {
  // Context
  const { channelSelectedItems } = useChannelSelectedItems();
  const { ErrorMessage } = useContext(ErrorContext);
  const {
    funcOpenModalMailModalChannel,
    funcOpenModalMailChannel,
    funcOpenModalMailFooter,
  } = useSendMail();
  const { insert, reset, profile } = useProfile();

  const schema = Yup.object().shape({
    name: Yup.string().required('O primeiro nome é obrigatório.'),
    email: Yup.string()
      .email('E-mail inválido.')
      .required('O e-mail é obrigatório.'),
  });

  const handleSetProfile = useCallback(
    (values: IValuesForm) => {
      const { name, email } = values;

      reset();
      insert({
        name,
        email,
      });
    },
    [reset, insert],
  );

  const handleSendEmail = useCallback(
    async (values: IValuesForm) => {
      const channelId = channelSelectedItems.filter(
        f => f.channel === data.channel,
      );

      if (channelId.length) {
        // sendmail
        try {
          const { name, email } = values;

          await apiMail.post('/sendmail', {
            name,
            email,
            logo:
              'https://eadctrainingplatform.blob.core.windows.net/teste/logo-marvel-flix.png',
            channel: data.channel,
            list: channelId.map(r => ({
              title: r.title,
              description: r.description,
              modified: r.modified,
              pageCount: r.pageCount,
              issueNumber: r.issueNumber,
              thumbnail: r.thumbnail,
            })),
          });

          toast.success('E-mail enviado com sucesso.', {
            position: toast.POSITION.TOP_CENTER,
          });
        } catch (err) {
          ErrorMessage(err);
        }
      } else {
        toast.error('Não há itens selecionados para enviar e-mail.', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    },
    [ErrorMessage, data, channelSelectedItems],
  );

  const handleSendSimpleEmail = useCallback(
    async (values: IValuesForm) => {
      try {
        const { name, email } = values;

        await apiMail.post('/sendmail', {
          name,
          email,
          logo:
            'https://eadctrainingplatform.blob.core.windows.net/teste/logo-marvel-flix.png',
          channel: data.channel,
          list: [
            {
              title: data.title,
              description: data.description,
              modified: data.modified,
              pageCount: data.pageCount,
              issueNumber: data.issueNumber,
              thumbnail: data.thumbnail,
            },
          ],
        });

        toast.success('E-mail enviado com sucesso.', {
          position: toast.POSITION.TOP_CENTER,
        });
      } catch (err) {
        ErrorMessage(err);
      }
    },
    [ErrorMessage, data],
  );

  return (
    <div className="send-mail-container">
      <div className="send-mail-title">
        <h6 className="global-title-h6">ENVIAR E-MAIL</h6>
      </div>

      <Formik
        enableReinitialize={!profile}
        initialValues={{
          name: profile.name !== '' ? profile.name : '',
          email: profile.email !== '' ? profile.email : '',
        }}
        validationSchema={() => schema}
        onSubmit={async (values: IValuesForm, { setSubmitting }) => {
          setSubmitting(true);

          handleSetProfile(values);

          if (data.multiple) {
            await handleSendEmail(values);
          } else {
            await handleSendSimpleEmail(values);
          }

          funcOpenModalMailModalChannel(false);
          funcOpenModalMailChannel(false);
          funcOpenModalMailFooter(false);

          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit}>
            <ul>
              <li>
                <CssTextField
                  id="input-name"
                  name="name"
                  value={values.name}
                  label="Nome"
                  variant="outlined"
                  autoComplete="name"
                  margin="dense"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputLabelProps={{ shrink: !!values.name }}
                  inputProps={{ 'data-testid': 'name' }}
                  helperText={errors.name && touched.name ? errors.name : null}
                  error={Boolean(errors.name && touched.name)}
                />
              </li>
              <li>
                <CssTextField
                  id="input-email"
                  label="Email"
                  variant="outlined"
                  name="email"
                  value={values.email}
                  autoComplete="email"
                  margin="dense"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputLabelProps={{ shrink: !!values.email }}
                  inputProps={{ 'data-testid': 'email' }}
                  helperText={
                    errors.email && touched.email ? errors.email : null
                  }
                  error={Boolean(errors.email && touched.email)}
                />
              </li>
            </ul>

            <div className="global-buttons">
              <button
                data-testid="enviar"
                type="submit"
                className="global-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    ENVIANDO
                    <CircularProgress
                      style={{ marginLeft: '15px', color: '#ffffff' }}
                      size={20}
                      thickness={4}
                    />
                  </>
                ) : (
                  'ENVIAR'
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SendMail;
