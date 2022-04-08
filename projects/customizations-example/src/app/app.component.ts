import {
  AfterViewInit,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Channel } from 'stream-chat';
import {
  ChatClientService,
  ChannelService,
  StreamI18nService,
  MentionAutcompleteListItemContext,
  CustomTemplatesService,
  CommandAutocompleteListItemContext,
  ChannelPreviewContext,
  MessageInputContext,
  EmojiPickerContext,
  MentionTemplateContext,
  MessageContext,
  TypingIndicatorContext,
  ChannelActionsContext,
  AttachmentListContext,
  AvatarContext,
  AttachmentPreviewListContext,
  IconContext,
  LoadingIndicatorContext,
  MessageActionBoxItemContext,
  MessageActionsBoxContext,
  MessageReactionsContext,
  ModalContext,
  NotificationContext,
  ThreadHeaderContext,
} from 'stream-chat-angular';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('mentionAutocompleteItemTemplate')
  private mentionAutocompleteItemTemplate!: TemplateRef<MentionAutcompleteListItemContext>;
  @ViewChild('commandAutocompleteItemTemplate')
  private commandAutocompleteItemTemplate!: TemplateRef<CommandAutocompleteListItemContext>;
  @ViewChild('channelPreviewTemplate')
  private channelPreviewTemplate!: TemplateRef<ChannelPreviewContext>;
  @ViewChild('customMessageInputTemplate')
  private customMessageInputTemplate!: TemplateRef<MessageInputContext>;
  @ViewChild('mentionTemplate')
  private mentionTemplate!: TemplateRef<MentionTemplateContext>;
  @ViewChild('emojiPickerTemplate')
  private emojiPickerTemplate!: TemplateRef<EmojiPickerContext>;
  @ViewChild('typingIndicator')
  private typingIndicatorTemplate!: TemplateRef<TypingIndicatorContext>;
  @ViewChild('messageTemplate')
  private messageTemplate!: TemplateRef<MessageContext>;
  @ViewChild('channelActionsTemplate')
  private channelActionsTemplate!: TemplateRef<ChannelActionsContext>;
  @ViewChild('attachmentListTemplate')
  private attachmentListTemplate!: TemplateRef<AttachmentListContext>;
  @ViewChild('attachmentPreviewListTemplate')
  private attachmentPreviewListTemplate!: TemplateRef<AttachmentPreviewListContext>;
  @ViewChild('avatarTemplate')
  private avatarTemplate!: TemplateRef<AvatarContext>;
  @ViewChild('iconTemplate')
  private iconTemplate!: TemplateRef<IconContext>;
  @ViewChild('loadingIndicatorTemplate')
  private loadingIndicatorTemplate!: TemplateRef<LoadingIndicatorContext>;
  @ViewChild('messageActionsBoxTemplate')
  private messageActionsBoxTemplate!: TemplateRef<MessageActionsBoxContext>;
  @ViewChild('messageActionItemTemplate')
  private messageActionItemTemplate!: TemplateRef<MessageActionBoxItemContext>;
  @ViewChild('messageReactonsTemplate')
  private messageReactonsTemplate!: TemplateRef<MessageReactionsContext>;
  @ViewChild('modalTemplate')
  private modalTemplate!: TemplateRef<ModalContext>;
  @ViewChild('notificationTemplate')
  private notificationTemplate!: TemplateRef<NotificationContext>;
  @ViewChild('threadHeaderTemplate')
  private threadHeaderTemplate!: TemplateRef<ThreadHeaderContext>;

  constructor(
    private chatService: ChatClientService,
    public channelService: ChannelService,
    private streamI18nService: StreamI18nService,
    private customTemplatesService: CustomTemplatesService
  ) {
    void this.chatService.init(
      environment.apiKey,
      environment.userId,
      environment.userToken
    );
    void this.channelService.init({
      type: 'messaging',
      members: { $in: [environment.userId] },
    });
    this.streamI18nService.setTranslation();
  }

  ngAfterViewInit(): void {
    this.customTemplatesService.mentionAutocompleteItemTemplate$.next(
      this.mentionAutocompleteItemTemplate
    );
    this.customTemplatesService.commandAutocompleteItemTemplate$.next(
      this.commandAutocompleteItemTemplate
    );
    this.customTemplatesService.channelPreviewTemplate$.next(
      this.channelPreviewTemplate
    );
    this.customTemplatesService.messageInputTemplate$.next(
      this.customMessageInputTemplate
    );
    this.customTemplatesService.mentionTemplate$.next(this.mentionTemplate);
    this.customTemplatesService.emojiPickerTemplate$.next(
      this.emojiPickerTemplate
    );
    this.customTemplatesService.typingIndicatorTemplate$.next(
      this.typingIndicatorTemplate
    );
    this.customTemplatesService.messageTemplate$.next(this.messageTemplate);
    this.customTemplatesService.channelActionsTemplate$.next(
      this.channelActionsTemplate
    );
    this.customTemplatesService.attachmentListTemplate$.next(
      this.attachmentListTemplate
    );
    this.customTemplatesService.attachmentPreviewListTemplate$.next(
      this.attachmentPreviewListTemplate
    );
    this.customTemplatesService.avatarTemplate$.next(this.avatarTemplate);
    this.customTemplatesService.iconTemplate$.next(this.iconTemplate);
    this.customTemplatesService.loadingIndicatorTemplate$.next(
      this.loadingIndicatorTemplate
    );
    this.customTemplatesService.messageActionsBoxTemplate$.next(
      this.messageActionsBoxTemplate
    );
    this.customTemplatesService.messageActionsBoxItemTemplate$.next(
      this.messageActionItemTemplate
    );
    this.customTemplatesService.messageReactionsTemplate$.next(
      this.messageReactonsTemplate
    );
    this.customTemplatesService.modalTemplate$.next(this.modalTemplate);
    this.customTemplatesService.notificationTemplate$.next(
      this.notificationTemplate
    );
    this.customTemplatesService.threadHeaderTemplate$.next(
      this.threadHeaderTemplate
    );
  }

  inviteClicked(channel: Channel) {
    alert(
      `You can add channel actions to the channel header to manage the ${
        channel.data?.name || (channel.data?.id as string)
      } channel`
    );
  }
}