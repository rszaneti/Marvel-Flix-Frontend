import React, {
  useCallback,
  useState,
  useEffect,
  useContext,
  ChangeEvent,
} from 'react';
import { IconButton } from '@material-ui/core';
import { Formik, Form } from 'formik';
import { Modal, Fade, Backdrop } from '@material-ui/core';

import { FaCheckCircle } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';

// Context
import { useChannelSelectedItems } from '../../../context/ChannelSelectedItemsContext';
import { useDeselectAll } from '../../../context/DeselectAllContext';
import { ErrorContext } from '../../../context/ErrorContext';
import { useSendMail } from '../../../context/SendMailContext';

// Services
import { api } from '../../../services/api';

// Components
import Loading from '../../../components/Loading';
import ModalChannel from '../../../components/ModalChannel';
import SendMail from '../../../components/SendMail';

// styles
import '../stylesChannels.scss';
import {
  CssTextField,
  CssTooltip,
  CssPagination,
  CssModalStyles,
} from '../../../styles/globalMaterialUi';
import '../../../styles/global.scss';

interface ICharacterSummary {
  resourceURI: string; // The path to the individual character resource.,
  name: string; // The full name of the character.,
  role: string; // The role of the creator in the parent entity.
}

interface ICharacterList {
  available: number; // The number of total available characters in this list. Will always be greater than or equal to the "returned" value.,
  returned: number; //  The number of characters returned in this collection (up to 20).,
  collectionURI: string; //  The path to the full list of characters in this collection.,
  items: ICharacterSummary[]; // The list of returned characters in this collection.
}

interface IImage {
  path: string; // The directory path of to the image.,
  extension: string; // The file extension for the image.
}

interface ITextObject {
  type: string; // The canonical type of the text object (e.g. solicit text, preview text, etc.).,
  language: string; // The IETF language tag denoting the language the text object is written in.,
  text: string; // The text.
}

interface IComic {
  id: number; // The unique ID of the comic resource.,
  digitalId: number; // The ID of the digital comic representation of this comic. Will be 0 if the comic is not available digitally.,
  title: string; // The canonical title of the comic.,
  issueNumber: number; // The number of the issue in the series (will generally be 0 for collection formats).,
  variantDescription: string; // If the issue is a variant (e.g. an alternate cover, second printing, or director’s cut), a text description of the variant.,
  description: string; // The preferred description of the comic.,
  modified: Date; // The date the resource was most recently modified.,
  isbn: string; // The ISBN for the comic (generally only populated for collection formats).,
  upc: string; // The UPC barcode number for the comic (generally only populated for periodical formats).,
  diamondCode: string; // The Diamond code for the comic.,
  ean: string; // The EAN barcode for the comic.,
  issn: string; // The ISSN barcode for the comic.,
  format: string; // The publication format of the comic e.g. comic, hardcover, trade paperback.,
  pageCount: number; // The number of story pages in the comic.,
  textObjects: ITextObject[]; // A set of descriptive text blurbs for the comic.,
  resourceURI: string; // The canonical URL identifier for this resource.,
  // urls (Array[Url], optional): A set of public web site URLs for the resource.,
  // series (SeriesSummary, optional): A summary representation of the series to which this comic belongs.,
  // variants (Array[ComicSummary], optional): A list of variant issues for this comic (includes the "original" issue if the current issue is a variant).,
  // collections (Array[ComicSummary], optional): A list of collections which include this comic (will generally be empty if the comic's format is a collection).,
  // collectedIssues (Array[ComicSummary], optional): A list of issues collected in this comic (will generally be empty for periodical formats such as "comic" or "magazine").,
  // dates (Array[ComicDate], optional): A list of key dates for this comic.,
  // prices (Array[ComicPrice], optional): A list of prices for this comic.,
  thumbnail: IImage; // The representative image for this comic.,
  images: IImage[]; // A list of promotional images associated with this comic.,
  // creators (CreatorList, optional): A resource list containing the creators associated with this comic.,
  characters: ICharacterList; // A resource list containing the characters which appear in this comic.,
  // stories (StoryList, optional): A resource list containing the stories which appear in this comic.,
  // events (EventList, optional): A resource list containing the events in which this comic appears.
  active: boolean;
}

interface IComicDataContainer {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: IComic[];
}

interface IComicDataWrapper {
  code: number; // The HTTP status code of the returned result.,
  status: string; // A string description of the call status.,
  copyright: string; // The copyright notice for the returned result.,
  attributionText: string; // The attribution notice for this result. Please display either this notice or the contents of the attributionHTML field on all screens which contain data from the Marvel Comics API.,
  attributionHTML: string; // An HTML representation of the attribution notice for this result. Please display either this notice or the contents of the attributionText field on all screens which contain data from the Marvel Comics API.,
  data: IComicDataContainer; // The results returned by the call.,
  etag: string; // A digest value of the content returned by the call.
}

interface IEmailSelect {
  id: number;
  channel: string;
  title: string;
  description: string;
  thumbnail: string;
  modified: string;
  pageCount: number;
  issueNumber: number;
}

interface IParamsModal {
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
}

interface IParamTypes {
  channel: string;
}

const Comics: React.FC<IParamTypes> = ({ channel }) => {
  const classesModal = CssModalStyles();

  // Context
  const { channelSelectedItems, insert, reset } = useChannelSelectedItems();
  const { ErrorMessage } = useContext(ErrorContext);
  const { funcOpenModalMailChannel, openModalMailChannel } = useSendMail();
  const { deselectAll } = useDeselectAll();

  // State
  const [loading, setLoading] = useState(false);
  const [dataModalMail, setDataModalMail] = useState<IParamsModal>(
    {} as IParamsModal,
  );
  const [openModal, setOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState<IParamsModal>({} as IParamsModal);
  const [list, setList] = useState<IComicDataWrapper>({} as IComicDataWrapper);
  const [text, setText] = useState('');
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState('title');
  const [order, setOrder] = useState('');

  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (list.data) {
      const channelId = channelSelectedItems.filter(
        f => f.channel === channel || 'comics',
      );

      const data: IComicDataWrapper = {
        ...list,
        data: {
          ...list.data,
          results: list.data.results.map(r => ({
            ...r,
            active: Boolean(channelId.find(id => id.id === r.id)),
          })),
        },
      };

      setList(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deselectAll, channelSelectedItems, channel]);

  const loadList = useCallback(
    async (
      varOrder: string,
      varOrderBy: string,
      varPage: number,
      varText: string,
      varListChannelSelectedItems: IEmailSelect[],
    ) => {
      try {
        setLoading(true);

        const channelId = varListChannelSelectedItems.filter(
          f => f.channel === channel || 'comics',
        );

        const paramsObj = {
          orderBy: `${varOrder}${varOrderBy}`,
          limit: 20,
          offset: (varPage - 1) * 20,
        };

        let paramsSearchText = {};
        if (varText) {
          paramsSearchText = {
            titleStartsWith: varText,
          };
        }

        const params = Object.assign(paramsObj, paramsSearchText);

        const response = await api.get<IComicDataWrapper>(channel, {
          params,
        });

        setList({
          ...response.data,
          data: {
            ...response.data.data,
            results: response.data.data.results.map(r => ({
              ...r,
              active: Boolean(channelId.find(id => id.id === r.id)),
            })),
          },
        });
      } catch (err) {
        ErrorMessage(err);
      } finally {
        setLoading(false);
      }
    },
    [ErrorMessage, channel],
  );

  useEffect(() => {
    async function load() {
      await loadList(order, orderBy, page, text, channelSelectedItems);
    }

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadList, order, orderBy]);

  const handleChangePage = useCallback(
    async (event: ChangeEvent<unknown>, value: number) => {
      await loadList(order, orderBy, value, text, channelSelectedItems);
      setPage(value);
    },
    [order, orderBy, text, channelSelectedItems, loadList],
  );

  const handleChannelSelectedItems = useCallback(
    (
      id: number,
      title: string,
      description: string,
      thumbnail: string,
      modified_date: Date,
      pageCount: number,
      issueNumber: number,
    ) => {
      const channelId = channelSelectedItems.filter(
        f => f.channel === channel || 'comics',
      );

      if (channelId) {
        const existData = channelId.filter(r => r.id === id);

        if (existData.length) {
          // Remove item
          const dataNewChannelId = channelId.filter(r =>
            String(id).indexOf(String(r.id)),
          );

          reset();
          insert(dataNewChannelId);

          // state list manipulation;
          const findIndex = list.data.results.findIndex(r => r.id === id);

          list.data.results[findIndex].active = false;

          const data: IComicDataWrapper = {
            ...list,
            data: {
              ...list.data,
              results: list.data.results.map(r => ({ ...r })),
            },
          };

          setList(data);
        } else {
          // Add item
          channelId.push({
            id,
            channel: channel || 'comics',
            title,
            description,
            thumbnail,
            modified: modified_date
              ? `${String(modified_date).substring(8, 10)}/${String(
                  modified_date,
                ).substring(5, 7)}/${String(modified_date).substring(0, 4)}`
              : '',
            pageCount,
            issueNumber,
          });

          insert(channelId);

          // state list manipulation;
          const findIndex = list.data.results.findIndex(r => r.id === id);

          list.data.results[findIndex].active = true;

          const data: IComicDataWrapper = {
            ...list,
            data: {
              ...list.data,
              results: list.data.results.map(r => ({ ...r })),
            },
          };

          setList(data);
        }
      } else {
        // Add first item
        const dataChannelId: IEmailSelect[] = [
          {
            id,
            channel: channel || 'comics',
            title,
            description,
            thumbnail,
            modified: modified_date
              ? `${String(modified_date).substring(8, 10)}/${String(
                  modified_date,
                ).substring(5, 7)}/${String(modified_date).substring(0, 4)}`
              : '',
            pageCount,
            issueNumber,
          },
        ];

        insert(dataChannelId);

        // state list manipulation;
        const findIndex = list.data.results.findIndex(r => r.id === id);

        list.data.results[findIndex].active = true;

        const data: IComicDataWrapper = {
          ...list,
          data: {
            ...list.data,
            results: list.data.results.map(r => ({ ...r })),
          },
        };

        setList(data);
      }
    },
    [channel, list, insert, reset, channelSelectedItems],
  );

  const handleChangeOrder = useCallback(async (value: string) => {
    setOrder(value);
  }, []);

  const handleChangeOrderBy = useCallback(async (value: string) => {
    setOrderBy(value);
  }, []);

  const handleChangeSearch = useCallback(
    async (e: string) => {
      setText(e);

      clearTimeout(timer);

      const newTimer = setTimeout(async () => {
        setPage(1);
        await loadList(order, orderBy, 1, e, channelSelectedItems);
      }, 1000);

      setTimer(Number(newTimer));
    },
    [timer, loadList, order, orderBy, channelSelectedItems],
  );

  const handleOpenModal = useCallback(
    (
      id: number,
      title: string,
      description: string,
      modified_date: Date,
      pageCount: number,
      issueNumber: number,
      thumbnail: string,
      image: string,
      nameChannel: string,
      name: ICharacterSummary[],
      active: boolean,
    ) => {
      setDataModal({
        multiple: false,
        channel: channel || 'comics',
        id,
        title,
        description,
        modified: modified_date
          ? `${String(modified_date).substring(8, 10)}/${String(
              modified_date,
            ).substring(5, 7)}/${String(modified_date).substring(0, 4)}`
          : '',
        pageCount,
        issueNumber,
        thumbnail,
        image,
        nameChannel,
        name: name.map(r => r.name),
        active,
      });
      setOpenModal(true);
    },
    [channel],
  );

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  const handleOpenModalMail = useCallback(
    (
      id: number,
      title: string,
      description: string,
      modified_date: Date,
      pageCount: number,
      issueNumber: number,
      thumbnail: string,
      image: string,
      nameChannel: string,
      name: ICharacterSummary[],
      active: boolean,
    ) => {
      setDataModalMail({
        multiple: false,
        channel: channel || 'comics',
        id,
        title,
        description,
        modified: modified_date
          ? `${String(modified_date).substring(8, 10)}/${String(
              modified_date,
            ).substring(5, 7)}/${String(modified_date).substring(0, 4)}`
          : '',
        pageCount,
        issueNumber,
        thumbnail,
        image,
        nameChannel,
        name: name.map(r => r.name),
        active,
      });

      funcOpenModalMailChannel(true);
    },
    [channel, funcOpenModalMailChannel],
  );

  return (
    <div className="content">
      <Modal
        aria-labelledby="transition-modal-title3"
        aria-describedby="transition-modal-description3"
        className={classesModal.modal}
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <div className={classesModal.paper}>
            <ModalChannel data={dataModal} />
          </div>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title2"
        aria-describedby="transition-modal-description2"
        className={classesModal.modal}
        open={openModalMailChannel}
        onClose={() => funcOpenModalMailChannel(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModalMailChannel}>
          <div className={classesModal.paper}>
            <SendMail data={dataModalMail} />
          </div>
        </Fade>
      </Modal>

      <div className="title-form">
        <div>
          <h1 className="global-title-h1">Histórias em Quadrinhos</h1>
        </div>
        <div>
          <Formik
            initialValues={{
              search_name: '',
              order_by: '',
              order: '',
            }}
            onSubmit={async () => {
              // onsubmit;
            }}
          >
            {({ values, handleChange, handleBlur, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <ul className="form">
                  <li>
                    <CssTextField
                      id="input-search-name"
                      label="Pesquisar HQs"
                      variant="outlined"
                      name="search_name"
                      value={values.search_name}
                      autoComplete="search_name"
                      margin="dense"
                      onChange={e => {
                        handleChange(e);
                        handleChangeSearch(e.target.value);
                      }}
                      onBlur={handleBlur}
                    />
                  </li>
                  <li>
                    <CssTextField
                      id="select-order-by"
                      name="order_by"
                      select
                      label="Ordenar por"
                      value={values.order_by}
                      onChange={e => {
                        handleChange(e);
                        handleChangeOrderBy(e.target.value);
                      }}
                      onBlur={handleBlur}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      SelectProps={{
                        native: true,
                      }}
                      margin="dense"
                      variant="outlined"
                    >
                      <option value="title">Título</option>
                      <option value="issueNumber">Nº da edição</option>
                      <option value="modified">Modificado em</option>
                    </CssTextField>
                  </li>
                  <li>
                    <CssTextField
                      id="select-order"
                      name="order"
                      select
                      label="Ordem"
                      value={values.order}
                      onChange={e => {
                        handleChange(e);
                        handleChangeOrder(e.target.value);
                      }}
                      onBlur={handleBlur}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      SelectProps={{
                        native: true,
                      }}
                      margin="dense"
                      variant="outlined"
                    >
                      <option value="">Ascendente</option>
                      <option value="-">Decrescente</option>
                    </CssTextField>
                  </li>
                </ul>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          {list.data ? (
            !list.data.count ? (
              <div className="no-result">
                <div className="no-result-content">
                  <h4 className="global-title-h4">
                    Nenhuma história em quadrinho encontrada para &quot;
                    {text}&quot;
                  </h4>
                </div>
              </div>
            ) : (
              <ul className="channel-list">
                {list.data.results.map(r => (
                  <li className="channel-list" key={r.id}>
                    <div className="channel-list-content">
                      <img
                        src={`${r.thumbnail.path}/landscape_xlarge.${r.thumbnail.extension}`}
                        alt={r.title}
                        aria-hidden="true"
                        onClick={() =>
                          handleOpenModal(
                            r.id,
                            r.title,
                            r.description,
                            r.modified,
                            r.pageCount,
                            r.issueNumber,
                            `${r.thumbnail.path}/landscape_xlarge.${r.thumbnail.extension}`,
                            `${r.thumbnail.path}/landscape_incredible.${r.thumbnail.extension}`,
                            r.characters.items.length ? 'Personagens' : '',
                            r.characters.items.length ? r.characters.items : [],
                            r.active,
                          )
                        }
                      />
                      <div className="channel-box-info">
                        <p
                          className="global-paragraph"
                          aria-hidden="true"
                          onClick={() =>
                            handleOpenModal(
                              r.id,
                              r.title,
                              r.description,
                              r.modified,
                              r.pageCount,
                              r.issueNumber,
                              `${r.thumbnail.path}/landscape_xlarge.${r.thumbnail.extension}`,
                              `${r.thumbnail.path}/landscape_incredible.${r.thumbnail.extension}`,
                              r.characters.items.length ? 'Personagens' : '',
                              r.characters.items.length
                                ? r.characters.items
                                : [],
                              r.active,
                            )
                          }
                        >
                          {r.title}
                        </p>
                        <div className="channel-box-icon">
                          <CssTooltip title="SELECIONE PARA ENVIO EMAIL">
                            <IconButton
                              size="small"
                              aria-label="SELECIONE PARA ENVIO EMAIL"
                              onClick={() =>
                                handleChannelSelectedItems(
                                  r.id,
                                  r.title,
                                  r.description,
                                  `${r.thumbnail.path}/landscape_xlarge.${r.thumbnail.extension}`,
                                  r.modified,
                                  r.pageCount,
                                  r.issueNumber,
                                )
                              }
                            >
                              <FaCheckCircle
                                className={`channel-icon ${
                                  r.active
                                    ? 'channel-icon-check-active'
                                    : 'channel-icon-check'
                                }`}
                                size="30"
                              />
                            </IconButton>
                          </CssTooltip>

                          <CssTooltip title="ENVIAR E-MAIL">
                            <IconButton
                              size="small"
                              aria-label="ENVIAR E-MAIL"
                              onClick={() =>
                                handleOpenModalMail(
                                  r.id,
                                  r.title,
                                  r.description,
                                  r.modified,
                                  r.pageCount,
                                  r.issueNumber,
                                  `${r.thumbnail.path}/landscape_xlarge.${r.thumbnail.extension}`,
                                  `${r.thumbnail.path}/landscape_incredible.${r.thumbnail.extension}`,
                                  r.characters.items.length
                                    ? 'Personagens'
                                    : '',
                                  r.characters.items.length
                                    ? r.characters.items
                                    : [],
                                  r.active,
                                )
                              }
                            >
                              <HiMail
                                className="channel-icon channel-icon-mail"
                                size="40"
                              />
                            </IconButton>
                          </CssTooltip>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )
          ) : null}

          {list.data ? (
            <div className="pagination">
              <CssPagination
                count={Math.ceil(list.data.total / 20)}
                variant="outlined"
                shape="rounded"
                page={page}
                onChange={handleChangePage}
              />
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Comics;
