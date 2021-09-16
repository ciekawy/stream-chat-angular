import { Component } from '@angular/core';
import { Channel } from 'stream-chat';
import { ChannelService } from '../channel.service';

@Component({
  selector: 'stream-channel-header',
  templateUrl: './channel-header.component.html',
  styleUrls: ['./channel-header.component.scss'],
})
export class ChannelHeaderComponent {
  activeChannel: Channel | undefined;

  constructor(private channelService: ChannelService) {
    this.channelService.activeChannel$.subscribe(
      (c) => (this.activeChannel = c)
    );
  }
}