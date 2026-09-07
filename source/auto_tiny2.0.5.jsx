// 设置版本的变量
var version = "2.0.5";

// ======================== 脚本UI配置 ========================
var SCRIPT_TITLE = "Auto_Tinify 快点鸭-压快点";
var SCRIPT_SUBTITLE = "主打简单快捷的After Effects 图片压缩工具";
var LOGO_IMAGE_BASE64 = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00Z\x00\x00\x00Z\b\x06\x00\x00\x008\u00A8A\x02\x00\x00\x00\tpHYs\x00\x00\x0E\u00C4\x00\x00\x0E\u00C4\x01\u0095+\x0E\x1B\x00\x00\x05\u00A0iTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 9.1-c002 79.dba3da3, 2023/12/13-05:06:49        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmlns:dc=\"http://purl.org/dc/elements/1.1/\" xmlns:photoshop=\"http://ns.adobe.com/photoshop/1.0/\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stEvt=\"http://ns.adobe.com/xap/1.0/sType/ResourceEvent#\" xmp:CreatorTool=\"Adobe Photoshop 25.7 (Windows)\" xmp:CreateDate=\"2026-03-20T17:25:58+08:00\" xmp:ModifyDate=\"2026-03-20T19:23:49+08:00\" xmp:MetadataDate=\"2026-03-20T19:23:49+08:00\" dc:format=\"image/png\" photoshop:ColorMode=\"3\" photoshop:History=\"2026-03-20T19:23:35+08:00&#x9;\u00E6\u0096\u0087\u00E4\u00BB\u00B6 logo.png \u00E5\u00B7\u00B2\u00E6\u0089\u0093\u00E5\u00BC\u0080&#xA;2026-03-20T19:23:49+08:00&#x9;\u00E6\u0096\u0087\u00E4\u00BB\u00B6 F:\\\u00E6\u008F\u0092\u00E4\u00BB\u00B6\u00E8\u0084\u009A\u00E6\u009C\u00AC\u00E5\u00BC\u0080\u00E5\u008F\u0091\\auto_tiny\\logo\\logo.png \u00E5\u00B7\u00B2\u00E5\u00AD\u0098\u00E5\u0082\u00A8&#xA;\" xmpMM:InstanceID=\"xmp.iid:49a326ec-28cd-1342-b126-b6c4a4667cb8\" xmpMM:DocumentID=\"xmp.did:49a326ec-28cd-1342-b126-b6c4a4667cb8\" xmpMM:OriginalDocumentID=\"xmp.did:49a326ec-28cd-1342-b126-b6c4a4667cb8\"> <xmpMM:History> <rdf:Seq> <rdf:li stEvt:action=\"created\" stEvt:instanceID=\"xmp.iid:49a326ec-28cd-1342-b126-b6c4a4667cb8\" stEvt:when=\"2026-03-20T17:25:58+08:00\" stEvt:softwareAgent=\"Adobe Photoshop 25.7 (Windows)\"/> </rdf:Seq> </xmpMM:History> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>\u00C0\x00y\u0098\x00\x00\x1A@IDATx\u009C\u00DD]y|\x14U\u00B6\u00FE\u00EE\u00AD\u00EA\u00AC$$!$d\u00DF d\b/\u0086%\x04\u0089\x04\u0098\u0087\b\x13Dt\u009El.H\u0082 O\x1DG@\u00E5).\u0088\u00E8\u00C8<\u0097AV\x1D\x18\u009E3\u00C2\x00\u0083\x1B(\n\u0088,\u00C2\x03\u00D9\x13\x12\x02\u0081\b\x01\x12\u00C8\u00BE\u0092NwW\u009D\u00F7GwUw%\u009D\u00D0\u009Dt\b\u00BE\u00EF\u00C7\r\u00B7\u00AA\u00EEr\u00EA\u00ABS\u00E7\u00DE:wiFD \"\u00B4\x07\u008C15~\u00ED\u00DA\u00B5\u0084\x0B\x17.$\u0094\u0095\u0095\x05\u009AL\x128g\x04\u0080Y\u00CAfD\u00C4\u0089\u00C8\u009A\u00871b\x001\u00C6\x18\u00C0\u0088\x01 \x10\x03\x00\x06F\u008C1\u0099@d>\x04\x03\x01D`\u00B0\u00A4\u00B1\u00C8M\x169\x18\x18\u0088\u0081\x11\b\f\x1C\u00C4\x19's:\x10@`\x16\u0090\u00E5,\u00E7\\f\u008C\u00831\u00B0>}\u00FA\u00E4%&&\x1EV\u00CAm\u00EB>\u009B\u00A7\u00B1^#\u00E5\u009FE\\\u00D2\u00E6#\"\u00C8\u00B2\u00ECtP\x1E\u00D0\u00C6\u008D\x1B\u00FF\u0090\u0096vO\u008E \bd\u00AE\u00ED\u00D7\x19\u00FE\u00FE\u00F7\u00BF?\u00A7\u00DCSk\u00F7j\u00EF\u00BA\u00F5\u00BC\fR\u00CE\u00C9\u00D4\"_\u00BB\u0088&\"\x14\x16\x16\u00A6\u00A4\u00A6\x0E\u00CD\u00EFj\u0082\\\x19\u00D6\u00AD[7\u00BFm2\u00DBO\u00B4\b'\u00C1\x18\u00C3\u00F1\u00E3\u00C7\u00C7\u008D\x1A5\u00EA\u00DB\u00BA\u00BA:\u00CD5///\u0084\u0086\u0086\u00C1\u00C3\u00C3\x1DD\u0080 pH\u0092d\u0089\x0Bj~\u00C6\x18d\u0099`~\u00B3,\x06\u00C2\x02\u00CE\x18\u00B8 \u0082H\u0086$I\x00\x00\u0081s\x10\b\u00E6\f\x04Y\"p\u00CEa6\t\u00E6\u00FFM&\t\u00B2,\u0083s\u00A6\x18\x1Cp\u00C6,7\n\x0B\u0097\x00\x11 \u00CBf\u0099JJJ\u00A8\u00B6\u00B6\u00D6R3\u00B1\u00CC\u00CC\u00CC?s\u00CEi\u00FA\u00F4\u00E9\u00EF1K^\u0097\u00C1\x19\u008D&\"\u00D4\u00D4TGzzzj4a\u00F4\u00E8{\u00E9\u00EB\u00AF\u00BF\u00A6\u00D2\u00D2R\u00FA5\u00E1\u00D9g\u009F%\x00\u00B2M \x00\u00F4\u00F9\u00E7\u009Fg\u0092\u008D\u00F6\u0092\x0B4\u00DAa\u00A2\u0095\f\u00E9#F\u009C\u00B1%y\u00E9\u00D2\u00A5]\u00C1\u0091K\u00F0\u00FC\u00F3s\t\u00E6\u00D6\u00B5\x05\u00D9\u009B6m\u009AM\u00CD\b\u00A6\u00DBE\u00F4\u00B6m\u00DB\x1E\u00B7%y\u00CD\u009A5]B\u0090\u00AB`\u00D1hb\f4\u00D2\u00DFO\u00F6\x16D\r\u00D9\u00DB\u00B6m\u009BN\u00B7\u0093h%\u00F1\u00C8\u0091#\u008F)B\u008C\x1A5\u00AA+\u00B8q)\u00E6\u00CD\u009B\u00A7*\u00CD\u00C6\u00F0h\u00DA\u00F9\u009B\u00FE2\x18\u00D3\u0090\u00BD}\u00FB\u00F6\u00C7\u00A8\u0099\x19i\x0F\u00D1\x1C0\u00B71m\x05\x00\u00A8\u00AA\u00AA\n\u00DB\u00BBw\u00DF \u00C5\u00B6/^\u00BC\u00D8u\rE\x17\u00C1\u00CD\u00CDM\u008D\u009F3\x18p\u00AF\x7F\x0F\u00F6A\u009F~\u00CA)\x02\u0080\u00F1\u00E3\u00C7\x7F\u00BAm\u00DB\u00B6\u00E9\u0080m\u009FY\u00DB\u00AFv\x04\u00DC\u009A\u00B1\u00AD\x00\u009C={\u00B6\u00BF\u00D2r\x07\x05\x05!--\u00CD\u00E9\u00CA\u00EE4\u0098{.f\u0098\x04\x01\u00A8\u00AB\u00C3\x1F}\u00BA\u00B1\u00A5\u00D1\u00B1\u00CAi\x02\u0080\t\x13&\u00AC\u00DF\u00BF\x7F\u00FF\u0084\x0E\u00D5\u00E5h\u00C2\u00DA\u00DAZ\x1F%\x1E\x11\x11\u00D9\u0091:\u00EF\x18\u0098L\u0092\x1A\u00E7\x00$\u0081\u00A3@\u00DF\u0080\x17\x02\x02\u00B1,:N\u00B9D\x000b\u00C4\u0088\u00AFv\u00ED\u00DA\u00F5\x1F\u0080\u00F5-w\x06\x0E\x13\u00CD9W\u00A5\u0092e\u00A9\u00AD\u00A4\u00BF\x1A\u00E8\u009B\u00F4j\u009C@\u00E0`0\u0080\u00E1\u0082A\u00CF\u009E\u00ED\x19\u0088\u00BFDi5{\u00CC\u00981[\u00DA\u00AB\u00D9\x0E\x13\u00CD\x18g\u00D6x;\x1E\u00E9\u009D\b\u009B\x0F\x12\u0091\x11\u0098,\u0081\x01\u00B8\u00C9\u0080s\u008D7\u00D9\x1Fz\x06\u00E2\u00A3\u00A8\u0096\u009A}\u00F0\u00D0\u00C1q\u00CA\u0087\u0097\u00A3p\u0098\u00E8\u00FF\u008F\u00B0%J \x00\u00CC\u00FC\u00C5\u00C8H\u0086\u009E\x03g\r\u008Dx\u00A6\u00A7?V53##G\u008C\u00FC\u00F6\u00E8\u00D1\u00A3\u00FF\u00EEL]\u008Ek\u00B4\u00D2\x12B\u00A3\b\u00BFjPs/\u009C\u00C4\u00A0\u00F8\f\x19\x00\x03\x07\u00CB7\u00EA\u00D9S=\x03\u00B0,&\x16\u0096\u008E\x01\u0099L&\f\x192d\u00F7\u0089\x13'F:Z\u0097\u00E3\x1A\u00ED\"ka0\x18PVV\u0086\u00A2\u00A2\"\\\u00B9r\x05\u00E5\u00E5\u00E5\u00B8y\u00F3\u00A6k\nw\x12&\u0093I\u008D\x0B\x16&\x04\x19\u00E0\x16g-\x07C\x13\u00E7\u00C87\u00DCd\u00CF\x06\x05\u00E2\u0093\u00F8\u00BEJr\x02\u0080\u00BB\u00EF\x1E\u00F6cvv\u00F6pG\u00EAr\u00D8\u00A9\u00C49\u0097\u00ADG\u008E\u00AB\u00F4\u00F1\u00E3\u00C7p\u00F8\u00F0\x11\x1C9r\x04yyy\u00B8z\u00F5*jjj\u00A0\u00D77\u00811\x06wwwxzz\"00\x10\u00E1\u00E1a\x188` \u0086\u00A5\r\u00C3\u00D0\u00A1C\x11\x1A\x1A\u00EAp=\u00ED\x01\u00E7\u0082\x1A72\x0E\u00E8t\u00E0F\x19\"\x01\x06\"0\u0099A\u00E4\u0080A`8\u00DF\u00D4\u00C0f\u00F6\u00F0\u00A1\u00DA\u00988\u00CC\u00FB\u00E5\"\x00\u0090\u00C1\u00D0\u00C4\x06\x0FN\u00D9\x7F\u00E6L\u00CE\u0090\u00F8\u00F8\u00F8\u00A3m\u00F1\u00E20\u00D1\u00E4\u0084Ngggc\u00D5\u00AAU\u00D8\u00B1c\x07._\u00BE\u00DCz\u0099D\u00D0\u00EB\x1B\u00A1\u00D77\u00A2\u00AA\u00AA\x12\x05\x05\u00E7\u00F1\u00E3\u008F?\u00E2\u00BD\u00F7\u00DF\u0083(\u00EA\u0090\u009E>\x1C\u008FO\x7F\x1CS\u00A7L\u00D5|\\\u00B8\n\u00BDz\x05\u00AB\u00F1]\u00F5uX\x18\x18\x04\x1Dd\u0090D\x10\t\u0090D\x01\u008Cd\u0088\u00C4a\u00E4\u00C0\u00F9\u00C6&6\u00B7\u0087?\u0099L\u00D1x\u00E9\u00CA%\x00 \u00A3\u00D1\u00C0\x06\x0E\x1Ct\u00E4\u00D8\u00B1\u00A3C\x13\x12\x12~n\u00CD\u00AE:n:4\x05\u00D8\u00E7|\u00DF\u00BE}\x187n,\u00EE\u00BA\u00EB.\u00AC^\u00BD\u00BAM\u0092o\x05\u0093\u00C9\u0088={\u00F6\u00E0\u0089\u00E9O &&\x06\u00FF\u00FD\u00DF\x7F\x06\u0091|\u00EB\u008CN\u00E0\u00BE\u00FB\u00EES\u00E3\u00FB\u00AB\u00AB\u00F1y}=\u00A2\u00DD= K2\x04\x02D\u0099\u00C0e\x06.\x11 \x03M\u008C\u00E1\u0097&\x03{\u00B1W/\u00F6fL\u00BC:\u00B4\u00D2\u00D0P\u00CFR\u0087\u00A4\x1E\u00BCt\u00E9Rrk=\x11F\x0E\u00B6l?\u00FC\u00F0\u00C3\u00C4\u00D1\u00A3G\x7F\x01\x00\u00C9\x03\x06\u00E0\u00E4\u0089\x13\u00EA\u00B5\x0B\x05\x17\u00F0\u00FC\u00DC\u00E7\u00B1}\u00FBv\u00BBy##\u00A3\u0090\u009E>\x1C\u00F1\u00F1\u00F1\u0088\u008E\u008EFPp0\u00FC\u00FC\u00BA\u00C3\u00C3\u00DD\x03\u00F5\u00F5\u00F5\u00A8\u00A8\u00A8\u00C0\u00B5\u00ABWq\u00E1\u00E2E\x1C?q\x02\u00FB\u00F6\u00EE\u00B5[N\\\\\x1C\u00DE~\u00FB\x1DL\u009A\u00F4\u00B0C2;\u0082~\u00FD\x12q\u00F6l\x1E\x00 \u00C8\u00D3\x1B\x07\u00FA\u00C6#\u009E\x18\u008A\u009B\f\u00D0C\x06\u00E3\u00DC\u00A2V\f2\b\u00C4\x18\u00BC8G\u0088\u0087\x0F\u00DE\u00BC~\x15\u00AF_\u00B9\u00A4\x10\u00C8\u00FC\u00FD\u00FD\u008D'N\x1CO\u0089\u008E\u008E9Mdg(\u00CB\u0091\u00B0{\u00F7\x0F\x13aq\u00B4\u00F4\u00EB\u0097\u00A8:f>\u00FA\u00E8#\x12\x05\u00B1\u00C5hEXX\x18\u00CD\u009F?\u009F\u00F6\u00EE\u00DDK\u0092$9\u00E5\u00EC9\x7F\u00FE<}\u00F8\u00E1\u0087\u0094\u009E\u009Enw$$33\u00CB\u00E92[\u00C3\u00F1\u00E3\u00C75e\u00FB{y\u00D0\u00D6\u00F8\x04jJ\x1EH4` \x19\u0093\u0093I\u009F|\x175\u00DE\u0095L\u00FA\u00E4\u0081\u00D440\u0085\u00F4\x03S\u0088\u0092\x07\x13\r\x1FA\u00CB\u0093\x12I\u00A7\u00D3\u00A9\u008E\u00A8\u00E0\u00E0\u00E0\u00BA\u00A2\u00A2\u00CB\u0089\u00CD\u00F9s\u0082\u00E8\u00DD*\u00D1\u00D3\u00A6=BDDYYY-H\u0088\u008B\u008B\u00A3e\u00CB>\"\u0083\u00C1\u00E0\x12\"v\u00EE\u00DCI\u00F7\u00DDw_\u008Bz\u0092\u0092\u0092\u00A8\u00A4\u00A4\u00C4%u\u00FC\u00F5\u00AFk[\u0094\x7F\u0097\u00AF/\u008D\r\f\u00A4\u00DF\u00FA\x07\u00D0H?\x7F\x1A\u00E1\u00D7\u009D\u00D2\u00FD\u00FDhD@\x00\u008D\u00F4\x0F\u00A0t??\u00CA\b\b\u00A4G\u00A2\"\u00C9\u00DD\u00DD\u009D\u00C0\u00982\u0088@\u0081\u0081=\x1A\u008B\u008A\u008A\u00E2\u00A9=D\x7F\u00FF\u00FD\u00CE\u0087\x14!\u00EE\x19>\u009C\u00C6\u008C\u00B9W#\u0098(\u008A\u00F4\u00EA\u00AB\u00AF\u0092,\u00CB.\u00B9\u00F9\u00E6X\u00BF~=\u0085\u0086\u0086i\u00EA\f\x0E\n\u00A63gr]R\u00FE\u008A\x15+]0\u00EEh%{\u00F6\u00EC\u00D9\u009FR{\u0088\u00DE\u00B9s\u00E7\u0083\u00ADU\u00902d\b\x15\x14\x14\u00B8\u00E4\u0086\u00DBB}}=M\u009C8QS\u00B7\u0087\u0087'\u00E5\u00E5\u00E5\u00B9\u00A4\u00FC\u009C\u009C\x1C\u00CA\u00C8\u00C8 Qli\n\u009D\b2\x00\u009A<y\u00CAVj\u00CF\u00E0,\u00E7\\\u00ED\u00DD\u00DB\x0E\\\u00CE\u00981\x03\u00EB\u00D6\u00ADs\u00B4\u0098\x0E\u00C1\u00DB\u00DB\x1B_|\u00F1\x05\x16.\\\u0088%K\u0096\x00\x00\u00F4\u00FAF\f\x1A4\b\u00E7\u00F2\u00CF!\"2\u00A2C\u00E5\u00F7\u00EF\u00DF\x1F\u00DB\u00B7oGqq1\u00B2\u00B3\u00B3QTT\x04\u00C6\u0098\u00D9\u009D\u00CA\u00CC\u00DF\u00C6\u0082\u00C0!\b\"\u00B8\u00C5\u00F5#\b\x02\u00DC\u00DC\u00DC!I&,^\u00BC\x18999\x00\x00//O\u00BD\u00A6prP\u00A3O\u009D:5\f\u00CD\u009E\u00DE\u00A2E\u008B\\\u00A2I\u00ED\u00C1\u00C7k>\u00D6\u00C8\x12\x1E\x1EN\u008D\u008D\u008D\u009D]\u00ADl\tv1u\u00EATU\u00A3g\u00CC\u0098\u00F1\x195\x1Fa\u0081\u00D9\u0086\u00B4\bJ\"\x00\u00F8\u00F2\u00CB/')\u00CF\x06\x00\x16,X\u0080\u00D7^{\u00ADC\x1A\u00D4\x11<9\u00EBI\u00FC\u00E9\u009D?\u00A9\u00C7W\u00AF^EzzzgW\u00AB\fq\u00D9E}}\u00BD\x1Ao\u00D1k&\"\u0090l?(\u00E3^\x16\u00E7\u0089j\u0083\u00A6M\u009B\u00DA\u00D9\u009A\u00E3023gh4{\u00F9\u00F2\x15]&\u00CB\u00FD\u00F7O\u00B0\u00D1\u00E8L\u008DF\u00B798kI$DFFV($\u0087\u0086\u0086u\u00D9\u008D\u00B4\u0086\u0098\u0098XM\u00EF\u00A7\u00BC\u00AC\u00ACK\u00E4\u00980\u00C1Jtff\u00D6?\u00A8\u0085\u00E9h\x03/\u00BF\u00FC\u00CA\u008A\u00A2\u00A2\u00A2\x00\u00CB\u008D\u00B0\x1F~\u00D8\u00ED\u00E8kv\u00DB\u00F0\u00D5W_\u00AAq\u0093\u00C9\u0084y\u00F3\u00E7w\u009D0Vh\u008D\x07\u00B5\u00A2\u00D1D\u0084\u00F2\u00F2\u00F2\b\u00D8\u0098\u008C\u00B7\u0096,q\u00B9\x16l\u00DD\u00BA\u0095\u009Exb\x06=\u00FA\u00E8c\u00B4i\u00D3\u00A6v\u0097\u00F3\u00F0\u00C3\x0FkLHY\x17h\u00B5V\u00A335\x1A\u00DD&\u00D1O<\u00F1\u00C4\x17\n\u00C9\x01=z\u00B8\\\u00B0\u00D9\u00B3g\u00B5\u00E8\u0087>\u00F9\u00E4\u0093\u00ED*+?\u00FF\u00AC\u00A6\u009Cg\u009Ey\u00C6\u00C5\u00D2\u00DE\x1A\u00B6Dgee\u00FD\u009DnE4\x11\u00E1\u00DC\u00B9s\x03m\x05\u00DF\u00BAu\u00ABK\u0085Z\u00BB\u00D6\u00FA\u00D9\u00CB\x18'f\u009E\u00CFL\x00h\u00D7\u00AE]\u00ED*s\u00D8\u00B0a\x1A\u00B2+**\\*\u00F3\u00AD\u00F0\u00C0\x03\x0F\u00A8D\u00CF\u009C9S\u00F3e\u00D8\u00C2F+\x1E\u00A77\u00DExC\u009D!\x13\x1F\u00DF\x17\x0F=\u00F4P\u0087\u008D\u0096-V\u00ADZ\u00A3\u00A9\u00CF6\u00BEi\u00D3\u00E6v\u00959g\u00CE\x1C\u00CD\u00F1W_\x7F\u00DDN\u00E9:\x0E\"\u00D2\u00F8K\u00ED6\u0086uuu=7n\u00FC\u00E7\u00EF\u0094\u00E3\u0085\x0B_q\u00B9 \u00D5\u00D5\u0095\u0096\u0098\u00AD<fq\u00EA\u00EB\u00EBZ\u00A4w\x04\u00A3F\u008D\u00D2\x1C\u009F\u00C99\u00D3\u00AEr\u00DA\x0B\u00B2\u00E9<S3\u00A7\u00BD]\u00A27l\u00D8\u0098\u00A54\u009A\u00DE\u00DE\u00DE\u00986u\u00AA\u00CB\u0085\n\x0B\x0B\u00B3\x15\u00D1\u00FC\u00D7\u00E2\u00D8\u00EF\u00D7/\u00B1\u00CD\u00BC%%%\u00D8\u00BF\x7F?\x1A\x1A\x1AZ\u0094\u00D9\u00B7o\u0082z\u00DC\u00BD{w\u00D7\b\u00EB d\u00DB\u00AF\u0094f_,\x1A\u00A2\u0095Ww\u00D9G\u00CB\u009EQ\u00CE\u00CD\u0099\u00F3\u009F\x10D\u00A7\u00E7\u00AB\u00DF\x12O?\u00FD\u008CE\x1E\x19\u00D6\u0087o\u00F5\u009F\u00B4\u00865k\u00D6 ..\x0E#F\u008C@\\\\\x1C\u00DE{\u00EF=\u00CD\u00F5\u00E0\u00E0\u009Ej|\u00EB\u00D6\x7F\u00C1d2\u00BAT\u00EE6\u00D1\u00D6 \n\u00D94\u0086D\u0084\u00F3\u00E7\u00CF\x0F\u0080M\u0083\u0092\u0093\u0093\u00D3i\u008D\u00C7\u009C9s4\u008DW\u00B7n\u00DDh\u00CB\u0096-\u00AD\u00A6\u00DF\u00BF\x7F\u00BF]\u008FYr\u00F2\x00z\u00F1\u00C5\x17\u00E9\u00A9\u00A7\u00E6\u0090\u00A7\u00A7\x17\x01Lm\\\u00C7\u008E\x1D\u00D7i\u00F27\u00C7\u00F8\u00F1\u00E3m\u00BF\f\u00EDu\u00EF\u00AC'>\u00F8\u00E0\u0083W\u0095\x1B\u0088\u0088\u0088\u00E8t\u00E16n\u00DCHYY\u0099\u00B4`\u00C1\x02*..n3mFF\u0086\u00DAK\u00B1Gxka\u00E7\u00CE\u00F6\u00F5b\u009C\u0085\u0086\u00E8\u00CC\x19\x1A\u00A2-6\u0081\u00A0\u00BC\u00BE{\u00F7\u00EEU\u00E7)\u008C\x1D;\u00AEc\u00AF\u0092\x03\u00982e\n\u00A6L\u0099\u00E2P\u00DA\x1B7J\u00CD\x11\"\u00CC\x19\x1D\r\u009D\u00B7\u0088e_]\x01\u00D0\u00A4I\x17\x1A\x18\u0080\u00B2\u00EAz\x18M\x06\x00\u00C0\u00F5\u00EB%\u00AE\x14\u00D9!p\u00A6m\u00FE,\u00F3\u00A3\u00CD$\u00CB\u00B2\u00EC\u00B1o\u00DF~u>\u00EE\u00A8\u00DFj[\u00F1\u00AE\u00862\u00CD\u0096@\u00988\u00D0\x17\x7Fy\u00AF7\u00CE|\u0098\u00847&\u00C7crZ(2GGa\u00D3\x0B\x03P\u00B8e\x18\x1EL\rQ\u00F3\u00ED\u00DD\u00B7\u00EF6Ih\u00D3\u00EBhf\u00AF5\u00AD\\NNvJuu\u0095\x17\x00\b\u00A2\u0088{G\u008F\u00BE\x1D\u00D29\f\u00BD\u00BEQ\u008D_*\u00D7\x03\u0097j\u0090\u00D8\x1BHL\n\x01L\x008\x07\u0098\t\x10\u00AB\u00F1\u00FA\u00A4\bl>x\r\u0080\t\u00EB\u00D6\u00AEEdD\x04^\x7F\u00FD\u00F5N\u0096\u00D0\u00AA\u00C5\u00B2,s\u00FBW\x00\u00EC\u00D9\u00F3\u00E3o\u0095x\u00EA\u0090T\x04\x06\x06v\u00B2`\u00CE\u00E1\u00EA\u00D5kj\u00DC\u00D3\u009D\x01$\u00C0X\x01\x18\x7F\u00A9\x03\u00EAn\x02\u00C6F\u00E0F#L\x17\u00F5\u00E87X\u0087\u0097\x1FT''\u00E2\u008D7\u00DE@\u00FF\u00FE\u00FD\u00B1a\u00C3\u0086N\u0094\u00B0u\u008D\u00D6\x10}\u00E8\u00D0\u00FF\x0EQ\u00E2C\u0087\x0E\u00EDD\u0081\u009C\u00C7\u00E9\u00D3\u00A7QYYa9\u00E2\u00F8M//\u00A0I\x06\u0093\x19t\u00FE\x1E(+\x15\u00B1k\x7F#\u00E0\u00EE\x03\u00B1\u0087\x0E\u00F4K5\u0096\u00CC\u00EA\u0085g\u00C6'\u00A9e\u00E4\u00E6\u00E6\u00E2\u0091G\x1EAzz:\u00BE\u00FE\u00FA\u00ABN\u0096X;\u0091FCtA\u00C1\u00F9\u00DEJ<))\tw\x12>\u00FE\u00F8\x135\x1E\x1B\u00E2\u0083\u00C1I\u00DD\u0080Z#D_\x01\x15\u00D5@\u00C2\x0B9\x18\u00F3\u00CEi\u00FCnq>*k9\u0098\u00B7\x1BPS\u008F\u008F\u00E6G\u00E2\u00C3\u00A7\u0086\u00C0C\u00E7\u00A9\u00E6?p\u00E0\x00\x1Ex`\"\u00D2\u00D3\u00D3\u00B1v\u00EDZTTT\u00D8\u00A9\u00B1\u00C3\u00D0\u00A8\u00B4JtSS\u0093oaaa\u00B4r\x1C\x1F\x1F\u00DF\x19\u0095\u00B7\x0B?\u00FF|\x14+W\u00AEP\u008F'\x0F\u00F5\x07z\u00CA0\x18\x01\u0088\u0084\u009B\u008D\u0084\u00CAzs\u00CFc\u00C7\u00A9\x12\fy>\x1B\u00E5\r\x02dp\u00E0J1\u009E\u009B\u00E6\u0089\u00FC\u00E5\u0083\u00F1\u00F0=\u00D1\u00B0\u00D5\u00AD\x03\x07\x0E`\u00E6\u00CC\u0099\u0088\u008D\u008D\u00C5\u00ACY\u00B3\u00B0a\u00C3g8}\u00FAt\u008B/NG\u00A15\x17\u00AD\u0098\u008E\u00A2\u00A2\u00A2\u0098\u00BA\u00BA:7\u00C0<\u00CB2..\x16w\x02\x0E\x1D:\u0084\u00B4\u00B4a6g<\u00F0\u00EC\u00F8^@\u00B9\x1E\x04\u0082\u00A9\u00D2\u0088\u0088p\u0086\u0093\x7FI\u00C3\u00C4\u00B48\x00\".\u0096\u00D6\u00A1\u00B0P\x0F\u00EE%\u00C0(1\x18/\u00D4\"*\u00C4\u0088\u00CD\u008Bz\u00E3\u00877\x07\u00E2w)\u00A1\u00B0\u00ED\x07\u00D4\u00D6\u00D6\u00E2\u0093O>\u00C1#\u008F<\u008A\u00E4\u00E4dDEE###\x03\u00CB\u0096}\u00E4\u009C\u00B6\u00DBp\u00CB\u009AM\u00C2S\u0088f\u0097/_\u008EQN\u0086\u0085\u0085!((\u00C8\t::\x07\u0087\x0F\x1FFZZ\u009Af\x1E\u00F3\u00A6\x17\u00FA#$V\u0084\u00A1\u0092\u00C0\u0088\u0081\x18\u0087T\u00D9\u0084\u00E4\u00BE\x12\u00BEx\u00A37\u008E\u00BF5\b?\u00BC2\x00\x03\u00A2\x04\u0098*M\x00\b\u00E0\f\u0086r#\u00E8J\x19~\u009B\u00AA\u00C37\u008B\x13pl\u00E9`d\u008D\u0089\u0086\u00B7\u0097W\u008Bz+*\u00CA\u00F1\u00ED\u00B7\u00DF\u00E2\u00B9\u00E7\u00FE\u0080\u00B8\u00B8\u00DE\u00D8\u00B2e\u008Bc\x02k\u00A6\u00DAi/\u0089\x00`4\x1A\u00BB\u00DD\u00B8Q\u00AAv1\u0082\u0082\u00BB\u009E\u00E4\u00B2\u00B22\f\x1Fn;\u00AA\u00CD\u00B0dF2&=\u00E0\x0BSa\x15\u00C0E\u00F3\u00BC \x00`\x02\u00E4\x12\x03\u00B8\u00D0\u0088\u0081I\" \u00B8A*5A\"\x0E\u00C6\x04\x00\u00E6\x05\u00FE&\x12\u0081kM\u00D0q#\x06%\u008A\u00F8\u00EB\u00A0h,\u0099\x16\u008A\u00CF\u00F6V\u00E1\u00CB\u009F\u00CBp\u00B9\u00D2\b\u00A3\u0089\u0083\u00E9\x18JJ\u00EA@0\u00A2\u00A6\u00A6\x1A\u0093&M\u00C2\u00993\u00B9HL\u00ECgGR\u00FB`\u00B0\u00D3\u008F\u00AE\u00AA\u00AC\f\u00A8\u00A8(\u00EF\u00A1\u009C\u00EC\u00E9t\u00B7\u008E0o\u00DE|TTT`\u00FD\u00FA\u00F5N\u00E6\u00B5\u008F\u00E5+\u0096\u00AB\x0E!/\x0F7\u00ACy:\x19\u008F>\u00D4\x1D\u00F2\u00A5j\u0098d\x11\u0096}W\x00\u00CBBnp\u0082$3\u00B0J\t\u00E6\u00FDQ\u0094ej\u00E6t\f0\u00AFE\u00E6\fF\x02X\u0099\x11\u008C\x19\x11\u00EC/`\u00EE\u00F4@\u00CC\u00FD}\b\u008C\u00B5\fFr\u0083\u00E8)\u00E0Z\u00BD\u008C\x19KOb_\u00AE\u00F9\u00AB\u00F2\u00ED\u00B7\u0097\u00E0\u00B3\u00CF>kSff\u00AB\u00D2\u0096\u008DY\x14\u0098\u0089\u00AE\u00AE\u00F6+/\u00B7\x12\u00EDl\u00FFy\u00F5\u00EA\u008F\u00F1\u00FE\u00FB\u00EF\x03\x00\u00AE\u00DF\u00B8\u008E\u00EFv|\u00E7T~{(8W\u00A0\u00C6\u00B3FG\u00E3\u00D1\x17z\x01{\u00AF\u00C2\u00D8$\u0080\u008B\u00E6%\u00BD\u00E6\u00D7\u00D3\u00B2w\u008D\u00E5\u00B68\x00Ff-\x06duQ \u0099\u00B7\u00A8\u00B1>\x00\u00C6!3\x0E\u00B9\u008E\u0080Z=t\u00DC\b\u009D\u009B\b\u009D`\x02\f\u0084\u0098q\u00B1x\u00FAB_\u0095\u00E8\u00C2_~\u00B9\u00A5\u00CCm\u00F8\u00EE\u00CC6\u00FA\u00E6\u00CD\u009B\u00BE\u00F5\u00F5\r\u00AA\u00F3\u00B6gO\u00E7L\u0087\u00AF\u00AF\u00BA\u00D6\x13\u00DF\x7F\u00F7=\x16,X\u00E0T~{\u00E8a\u00F3\u00B0w\u009D\u00BA\u0081\u00DD\u00EB\u008A\x01?\x1F\u00B8\u00F7\u00F6\u0082[O\x11n\x02\x07\u0087y\u00EE2'\u00F3\u00ABj^RM\x00q\u00F3>\x1E\u00DCl\u00C3\u00893\u0080\u009B]\r\x02\u0083\u00E5\u00BC\x00\u00EB\x12(\x06\u0083D06\x1A\u0081\x06\x13\x10\x1B\u0080\u009B\u00A7\u008Dxks\u00BE*CtT\u00F4-enk5\x1C\x07\u0080\u0086\u0086\u0086n\u00F5\r\u00F5*[^^\u009E\u00AD\u00E7\u00B0\u0083i\u00D3\u00A6a\u00EC\u00D8\u00B1\u00EA\u00F1\u00BB\u00EF\u00BE\u008BW^Y\u00E8T\x19\u00CD\u00F1\u00F8\u00E3\u008F\u00A9\u00F1\u00FC\u00AB5\u00B8\u00F7\u00E5\u00E3\x18:\u00F7\x1C\u00DE]W\u008AS\u00F9\x00\x02\u00BC \u00C6u\u0083.X\x07\u00D1\u009BC\u00E4\x00\x18\u0083\x04\x06p\x19\u0080\x04\u00CE8\u00B8e= S\u00FD$\x1C\u00D6VK\u0086\u00E5\x1D\x00\u0093d\u00E8|\x05\u00A0Ow|\u00FFS\x03\u0092\u00A6\x7F\u0087\u00ECs\u00D7U\x19\u00E6\u00CE}\u00FE\u009623\x1BG\x12cv\u00FA\u00D1\u008D\u008DzQ\u00DF\u00A8W\u00FB;\u009E\u009E\u00CE\x11\r\x00;v|\u008B\x01\x03\x06\u00A8\u00C7o\u00BF\u00BD\x04\u0093&M\u00C2\u008D\x1B7\u009C.\x0B\x00RRR\u00F0\u00EE\u00D2\u00A5\x10E\x11\u008Ay8\u0092w\x1D\x0B\u00D6\u009F\u00C5\u0080\u00E7\u008F\u00E2\u00EEyg\u00B1h\u00F5\x15\u00EC9\\\x0F\u00BDI\x07\x1E\u00D5\x1Dn\u00D1\x1Ep\u00EF\u00E9\x0E\u00D1\u0087Ct\u00E7`\x16Nm6\u00CC\u00B2\u00CC\u00AC\u00B5\f4Y\x1E\u0084\u00CE]\u0080.\u00C1\x17$\u00BAc\u00EE{\u0085\x18;w\x17.\x16[\u00BBu\u00AF\u00BD\u00F6\x1ARRRn)3i>\u00C1\u00B5\u00D7D\x00\u0090e\x13\u0097eI}\x1C\u00ED!\x1A`8t\u00E8 RS\u00EFFv\u00F6i\x00\u00C0\u0096-[\u00B0s\u00E7N\u00FC\u00F9\u00CFK1cF\x16DQ\u00B8E\x19Z\u00BC\u00F8\u00C2\x0B\u00F8\u00E9\u00C0~l\u00DB\u00B6]\u00D5\x16\u00F3G\u0081\x11\u0087sKp8\u00B7\x04\x00CH`7\u00FC{r\x00\u0086\u00F6\u00F6\u00C2\u00A0\u00C8n\u00E8\x1B\u00EE\x05\u00FF\x1E\u00EE\u00E0\u00DD\x18\u00B8 \x03M\x06\u00A0I\x06\f\u0092Y\u0089\x19\x03\u00DCE\u00A0\u009B\x00x\u00B8\x01u\f?\u00FEo\x1D\u00FE\u00F0\u0097<\u009C\u00B9\\\u00A9\u0091\u00E1\u00A5\x05\x0B\u00B0h\u00D1\"\u0087\u00E4\u00E5\u00DA\u00CFn\u00CD\u0081h\x16^;j+\u00B6s\u00E8\u00CA\u00C3\u00C3\x13\u00A7O\u009F\u00A2\u0087\x1E\u00FA=}\u00F1\u00C5\u00E7\x1C\x00jjj0k\u00D6l,^\u00BC\x04\u00B3g=\u0089\u00B1\u00E3\u00C6\")\u00E9.\u00E8t:\u00BBe\u00D4\u00D6\u00D6\u00E0\u00EC\u00D9|\x1C>|\x18[\u00B6lAnn\u00AE\u00AA\u0091\u00F6\x17\x0B\x11J\u00CA\u00EB\u00F0\u008F\u00DDu\u00F8\u00C7n\x00\x10\u00D0\u00BD\u00BB\x17\u00FA\u0084xb`\u0094\x17\u00EE\u008A\u00F3A\u00EF\u009E:D\x04\u00E8\u00D0\u00D3K\u0080\u009BN@\u0093I\u00C6\r\u00BD\x01\u00BFT\x19p\u00F8\\\x1D\u00BE\u00F9\u00B9\n\u00A7\u00CF\u0097iJ\r\b\b\u00C0\u00FB\u00EF\x7F\u0080\u00E9\u00D3\x1Fw\u009C\x00\u00DB~\u00B4\u00BD\u00EE\x1Dc\\f\u00CCfQ\u00BD\u00D4\u00A1\u00D5O\u00A6\u00CF?\u00DFzs\u00F5\u00AA\u00D5\u00DD\u00FF\u00F8\u00FC\x1F\u00D1\u00D4d\u00FE4\u00BEr\u00A5\b\x0B_}\x15\x0B_}\x15!!\u00A1\u0088\u0089\u0089\u0081\u00BF\u00BF?||\u00BAA\u0092d\u00D4\u00D4T\u00E3\u00FA\u00F5\u00EB\u00B8|\u00B9\b55\u00D5v\u00EE\u00C0,Sjj*\u00EE\u00BF\u00FF~\u00D4\u00D4\u00D4\u00E0\u009Bo\u00BEA^^^\u00B3\u00B4\x12jj\u00EAp\u00AC\u00A6\x0E\u00C7\u00F2m\u00F3\u00EB\u00E0\u00E3-B'24I2\x1A\x1A$\u0080\f-\u0084\x0F\r\r\u00C5\u00BCy\u00F3\u0090\u0095\u0095\u00D5\u00B1\u00C1\u00DDf\u00D3\r\u0094\u00F5)\u00E3\u00A7O\x7Fb\x13,C?o\u00BD\u00F5VGGu$\"\u00A2\u00A2\u00A2\"z\u00EA\u00A9\u00D9N\r;\u00D9\x06\u00F3\u0090\u0095\u00D9\u00A8&&&\u00D2w\u00DF}\u00D7\u00A2\u00A23g\u00CE\u00D0\u00DA\u00B5ki\u00CA\u0094\u00A9\x14\x13\x1D\u00D3\u00EE\u00BA\u00FA\u00F4\u00E9C\u00CB\u0097/'\u00BD^\u00DF\u00EE\u009B\u00B6\u009DM:}\u00FA\u00F4\r\u00D4|(\u00CB\u00D3\u00D3\u00D3\u00E8\u00E9\u00E9\u00A9\x0E\x17\u00D7\u00D5Y\u00E7\u00F9\u00B6\x13\x1C\x00\"\"\"\u00B0j\u00D5j\u00BC\u00F8\u00E2K\u00D8\u00BAu+6l\u00D8\u0080\u0093'O\u00DE:3\x17,f\u00C2\u00CC\u00C3\u00A4I\u0093\u00B0i\u00D3&\u00BBi\x13\x13\x13\u0091\u0098\u0098\u0088\u00CC\u00CCL\x00@~~>\u00CE\u009E=\u008B\u00FC\u00FC|\x14\x14\x14\u00A0\u00A0\u00A0\x00\u00E7\u00CF\u009FCi\u00A9\u00D54\b\u0082\u0088\u00D8\u00D8\x18$%%a\u00E0\u00C0AHO\x1F\u008E{\u00EE\u00B9\u00A7\u00A3\u00F7\u00DC\u00E6\u0092W\x11\x00|||\u00AB}}}\u00D5V\u00C0ht\u00ED\x10}LL\f\u00E6\u00CF\u009F\u008F\u00F9\u00F3\u00E7#;;\x1B'O\u009EDaa!jjja4\x1A\u00E0\u00EE\u00EE\x0Eooo\u0084\u0087\u0087\x01\u00E0x\u00FA\u00E9\u00A7!\u00CBf\x1B\u0097\u009E\u009E\u00DE*\u00C9\u00F6\u0090\u0090\u0090\u0080\u0084\u0084\x04\u00CD9\u00BD^\u008F\u00D2\u00D2R444\u0080s\x0E\x1F\u009Fn\b\r\rk\u00A5\u0084\u00F6\u0083\u00B7\u00D1\u0091\x16\x01\u00C0\u00C3\u00C3\u00BD\u00C1\u00CB\u00CBS\u00F5\rZg\x11\u00B9\x1EIIIm\u00FA\u00BA\u00D7\u00AD[\x07I\u00B2:\u0091\u00BEv\u00C1\u00B4.\x0F\x0F\x0FDFv\u00FE\u00AE9\u00CD\u00BAt-\u00FB\u00D1~~~\u00B5\x01\x01\x01U\u00CA\u00C9\u008A\u008A*t\x05\u00F4z=\u00E6\u00CD\u009B\u00A7\x1E?\u00F7\u00DCs\u00B7}\u00B6Q\u00C7\u00A0\u00E1\u00B6\u00A5\u009B\u00D4\u00DF\u00DF\u00BF200P\u00ED\u00A1w\u00D2\u0088\u00C3-\u00B1y\u00F3fTWW\u009B\x05\u00E3\x1Co.~\u00B3K\u00E4h/\u00C8F\u00A5\u009B\u00AF\t\u00E7\x00 \u008Ab}PP\u0090\u00DAZTT\u0094\u00DF.\u00D94\u00F8\u00E6\u009Bo\u00D4\u00F8\u00981\u00F7\u00C1\u00D7\u00C7\u00B7K\u00E4h/4D[\u009D\u00B8\x00lFXBCC\u008B\u0094xqq\t\u00F4z\u00ED2\u00B9\u00DB\u0081\u009F~:\u00A8\u00C6\u00C7\u008F\u00CF\u00B8\u00ED\u00F5w\x14\u00B6\u00BE\u008E\u00E6=\x10\u00F5Jxxx\u00B1\u00BB\u00BB;\x01@MM5\u00AE^\u00BDz{\u00A4\u00B3\u00A0\u00A8\u00A8\b\u00C5\u00C5\u00D6\u00E9\x04w\u00DA(\u00BC#hk3+\u0095h\x1F\x1F\u009F\u00D2\u00A8\u00A8(\u00F5N/^,\u00ECd\u00B1\u00B48\x7F\u00FE\u00BC\x1Aww\u00F7@\u00DF\u00BEw\u00CE\u00E0\u00B0\u00A3\u00D0\u00EE\x1A\u00A1\u00BD\u00A6\u0099n\x10\x1B\x1B\u00AB\u00B2\u009B\u0097\u0097\u00DB\u00B9R5\u0083\u00ED&*\u0091\u0091\u0091\u00E8\u00D6\u00CD\u00A7\u008D\u00D4w&\u00B4n\u00D2Vl4\x00\u00C4\u00C5\u00F5\u00B6\x12\u009D\u00DB\u00DC\u0087\u00D0\u00B9\u00A8\u00A9\u00A9U\u00E3\u00E1\x11\x1D[\u00D3\u00DDU\u00D0Z\u008E6f*\u00DD}\u00F7\u00D0\u00A3J\u00FC\u00C8\u00CFG:U\u00A8\u00E6\u0090$\u00EB\u00D7h\u0088\u00CD^G\u00BF&\u0090\u00C6^\u00B41Si\u00D8\u00B0\u00B4\u00FDJ<''\x07EEE\u00B8]0\u0099\u00AC\x1E\u00C3\u0090\u0090\u00906R\u00DE\u00B9\u00D0\u00F6\u00A3\u00B5\u00D74D\u00C7\u00C4D\u00E7\u00F7\u00EA\x15R\u00AD\x1C\u00EFmeo\u00A3\u00CE\u0080\u00F2\x1B\x00\u0080v\u009B\u00B4_+\u00C8\u00DE\u00AA,\u009B'aJI\x19\u00AC\u00EEJ\u00F5\u00E3\u008F{o\u009B`\u00B6\u00A3/\u00B6\u00DD\u00BC_1Z\x12m\u00AB\u00E6iii\u0087\u0094\u00F8\u00CE\u009D\u00DF\u00DF.\u00A1\u00E0\u00EF\u00EF\u00AF\u00C6/^\u00BCx\u00DB\u00EAu%lM\u0087vCFU\u00A3\u00AD\u008922\u00C6\u00AB\u00DF\u00C1\u00C5\u00C5\u00C58u\u00EA\u00F4m\x112&F\u009D\u0091\u0086\u0082\x0B\x17Z\x19\u00B6\u00BA\u00B3a\u00DB\x162\u00CE[\u00EF\u00DE\x01@\u00FF\u00FE\u0089\u0087#\"\"T\u00AF\u00D2\u00FA\u00F5\x7F\u00EBL\u00D9T\u00C4\u00C7\u00F7Q\u00E3\x15\u00E5\u00E5\u00B8\u00D4\u0081\u00CD\t\u00BB\n\u009A\x06\u0090\u00EC\u00B8I\u00D5k\u0096G\u009253\u00EB\x7F\u0094sk\u00D6\u00ACQ\u00C7\u00FD:\x13\u00A1\u00A1a\x1A\u009F\u00F1\u00B1c\u00C7:\u00BDN\u00D7\u00C3v\u00B9u\x1B\u00FDh\u00E5\x19<9\u00F3\u00C9U\u00CA)\u00BD^\u008F\u00D5\u00ABWw\u00A2pV\u00A4\u00DA\u00F87v\u00ED\u00BC\u00F3\u00F6\x05\u00B9\x15l}\x1D\u00A2\u00A8\u00D3l\x1B\u00AF%\u00DA\u0092.44\u00F4BF\u00C6\u00F8\u009F,gi\u00D1\u00A2\u00DB\u00E3\x17N\x1Fn\u00DD!\u00F8\u00AB\u00AF:{\u00E9\u0083\u00EBak:\u00BC\u00BC\u00BC5\x0B\u00DA[\u00D8h\u00C5||\u00F8\u00E1\x07\u00CF*\u00F9\u00AB\u00AA*\u00E9\u00B1\u00C7\x1Ek\u009E\u00D4\u00E5\u0098<y\u0092\u00DA\u009F.-\u00BD\u0081\u00CD\u009B\u00DB\u00B7\u00CBAWA\u00AF\u00B7\u009AX\x1F\x1F\u00EF\x1A\u00CDEjcc\u0094\u00FF\u00FA\u00AF\u0097WC\u009D\u0096\t\u00FA\u00DB\u00DF\u00FE\u00D6\u00EE\u00A1xG1y\u00F2du\n@X\u00D8\u009D\u00B7\x7FS[\b\x0F\u008FP\u0087\u00EE?\u00FD\u00F4\u00D3\u0099\u00E4\u00E8\x0E4D$DEEU\u00D8\u0092\u00ED\u00EA\rR\u009A\u00A3\u00F9\u00A6\u00AC+Vt\u00DD\u00AE_\u00CE ''G\u00E5\b\x00]\u00BBv-\u0096\u009C\u00D9%\u00EC\u00C2\u0085\x0B\x03l~\x14R\x06:\u00FF7\u00B2\u00C6\u00FDn\u009CJ4\u00E7\x02\u00E5\u00E4\u009C\u00E9\u00D4\u00FA\\\u0081\t\x13\u00EEW\u00F9\x19:th\x0E5\u00DB\u00A0\u00B1M\u00A2\x15\u00B2\u00F7\u00EC\u00D9c\u00BB/\u00A9\u00B2g\x10\u00DD\u00BCy\u00B3S\u0084\u00AE\u00AC\u00AC \u00CE\u00AD\u00BF\u00F8\u00E9\u00E7\u00E7G\u0085\u0085\u0085\u009DR\u0097+\u00B0j\u00E5*\u00CD\u00EFk\u00FD\u00F4\u00D3\u00C1\u00B1\u00E4,\u00D1\n\u00D9;\u00BE\u00DD1U\x10\u00B8-\u00D9rdd$\u00AD\\\u00B9\u00A2S\b\u00DF\u00B6m\u009B\u00C6\u0084t\u00EF\u00DE\u009D\u00FE\u00F5\u00AF\x7F\u00B9\u00BC\u009E\u008Eb\u00E5\u00CA\u0095\u00E6\u00C9\u00D8\x16\u00A2'N\u009C\u00B8\u009B\u00ECl9\u00EA0\u00D1D\u0084\u0093'O\u008E\u0088\u008F\u008F/n\u00A6\u00DDr\u00AF^\u00BD\u00E4W^YH\x07\x0F\x1E$\u00BD^o$\"#\x11\u0099,\u00A1\u00DD\u00D8\u00BCy3\u0099\u00CD\x16S\t\x7Fx\u00D2\u00C3t\u00E8\u00D0\u00A1\x0E\u0091\u00E3\n\x1C8p\u0080\x1E|\u00F0A\u0095\x03\x00\x14\x11\x11^\u00A1\u00D77v'j\u00F9\u00EBoL\u0089\u00B4\x05\u00DB\u008E\u00B8,\u00CB>s\u00E6<\u00F5\u00C9\u00C7\x1F\x7F2\u00D9\u00B6\u00F3\u00A2D\u0082\u0083\u0083Mqqq\x14\x14\x14,\u00F7\u00EC\x19({{y{H\u00B2\u00CCM&\x13L&\u0093\u00A6\u00AF\u00A9\u00EC\u00DAK\u00A4\u00AC+a\u00E0\f\u00E0\\\u0084\u00A8\x13\u00E1\u00EF\u00E7\u0087w\u00DEy\x07\x06\u0083\x01\u008Cq\u008D\u00FF\u00E3\u00DF\u00FE-\t\t\t}\u00E1\u00E1\u00E1\tY\u0096\u00C0\u00B9y9\u0085\u00F9\x17\x7F\u00ACe\u00C92A\u0092$K\u00B0n-*\b\x1C\u009C\u008B\x00\b\u0092$C\u0096%K~\x00`\u00B0\u00CE]g`\u008C[\u00CA\x07j\u00EB\u00EAp6\u00EF,,\u00DB\u00BF\u0099\x13\x03\b\x0B\x0B\u00AB<q\u00E2DJPP\u0090\u00FD\u00C1VrB\u00A3m\u00E3G\u008E\x1C\x19}\u00EF\u00BD\u00F7\x1E\u00B4}\u00BD[\tr;\u0083fV)cL\r\x0E\u00D4\u00D9Y\u00A1\u0085l\x00(#c\u00FC\u009E\u00AA\u00AA\u00AA\x10\u00B2c2\u00A8=\u00A6\u00A3\u00E5\u008F%\x12\u008E\x1F?1\u00EC\u00A5\u0097^Z\x1E\x11\x11Q\u00DA\u0085\x04tI\x184xP\u00EE?\u00FF\u00F9\u00CF\x19\u00F6\x14\u00B1yp\u00CAt4OgkR$\u0093\u00E4u&7')77\u00AF_AAA\u00EF+W\u00AE\u0086]\u00BF^\u00D2]\u0092drs\u00D3I\u008Cq&\u008A\u0082DDL\u0096en6\x17\u008C\x18\x038\u00E7\u00A4\u0094\u00C5\x18'Y\u0096\u00B9,\u00CB\u009Cs.\t\u0082`Y\u00D1C\u0096\u00EA\u00CD\u00A6F\u0092$\x0E\u0090eQ\n1E\u00DB%I\u00E6\u00E6\u0085:\f\u0092$q\u00CE\x19\u0089\u00A2([\u00CC\x14\x11\x11#\"\x060Y\u0096\u0089\x13I\u0082y\"\u00BEz+D\x04f\u0091\u0089dYf\u008C1\u00E8t\u00A2I\u00A7\u00D3\x19\x03\x03\x03kz\u00F7\u00EE]\u0098\u009A\u009Azt\u00F0\u00E0\u00C1\x07l35\u00E7\u00C4\x16\u00FF\x07r\x17\x1B\u00EE\u00BA\u00CA\x00\u00C9\x00\x00\x00\x00IEND\u00AEB`\u0082"; // 在此处添加图片的Base64字符串（留空则不显示图片）
var MAIN_WINDOW_TITLE = "快点鸭"; // 主窗口标题（版本号会自动添加）
var MAIN_PANEL_TITLE = "Auto_Tinify"; // 主面板标题

// 说明面板链接按钮配置
var LINK_BUTTON_1_TEXT = "项目地址";
var LINK_BUTTON_1_URL = "https://github.com/yancongya/auto_tinify";
var LINK_BUTTON_2_TEXT = "发布页";
var LINK_BUTTON_2_URL = "https://tinify.com/developers";
var LINK_BUTTON_3_TEXT = "网页版压缩";
var LINK_BUTTON_3_URL = "https://tinify.cn/";

// ======================== Tinify API 配置 ========================
var TINIFY_API_HOST = "api.tinify.com";
var TINIFY_API_PORT = 443;

// ======================== API Key 存储配置 ========================
var configFileName = "auto_tinify_config.txt";
var configFilePath = new File(File($.fileName).parent.fsName + "/" + configFileName);
var API_KEYS_INFO = []; // API Key 信息数组 [{key: "xxx", remaining: 500}, ...]
var currentKeyIndex = 0; // 当前使用的 API Key 索引

// ======================== 路径配置存储 ========================
var PATH_PATTERNS = []; // 路径模式数组 [{name: "xxx", pattern: "xxx"}, ...]
var currentPathPatternIndex = 0; // 当前选中的路径模式索引

// 加载路径模式配置
function loadPathPatterns() {
    PATH_PATTERNS = [];
    if (configFilePath.exists) {
        configFilePath.encoding = "UTF-8";
        configFilePath.open("r");
        var content = configFilePath.read().trim();
        configFilePath.close();
        if (content) {
            var lines = content.split('\n');
            for (var i = 0; i < lines.length; i++) {
                var line = lines[i].trim();
                // 跳过API Key行（以"key:"开头）
                if (line.indexOf("key:") !== 0) {
                    var parts = line.split('|');
                    if (parts.length >= 2) {
                        var name = parts[0].trim();
                        var pattern = parts[1].trim();
                        if (name && pattern) {
                            PATH_PATTERNS.push({name: name, pattern: pattern});
                        }
                    }
                }
            }
        }
    }
    // 如果没有配置，添加默认配置
    if (PATH_PATTERNS.length === 0) {
        PATH_PATTERNS.push({
            name: "默认-输出文件夹",
            pattern: "${projectPath}/输出"
        });
    }
}

// 解析路径模式，获取实际路径
function resolvePathPattern(pattern) {
    var result = pattern;
    // 替换 ${projectPath} 为项目文件所在的父目录
    if (app.project && app.project.file) {
        var projectPath = app.project.file.parent.fsName;
        result = result.replace(/\$\{projectPath\}/g, projectPath);
    } else {
        result = result.replace(/\$\{projectPath\}/g, "未保存项目");
    }
    return result;
}

// 加载 API Keys（包括密钥和剩余次数）
function loadApiKeys() {
    API_KEYS_INFO = [];
    
    if (configFilePath.exists) {
        configFilePath.encoding = "UTF-8";
        configFilePath.open("r");
        var content = configFilePath.read().trim();
        configFilePath.close();
        if (content) {
            var lines = content.split('\n');
            for (var i = 0; i < lines.length; i++) {
                var line = lines[i].trim();
                // 只读取以"key:"开头的行
                if (line.indexOf("key:") === 0) {
                    var keyData = line.substring(4).trim();
                    var parts = keyData.split(',');
                    var key = parts[0].trim();
                    var remaining = parts.length >= 2 ? parseInt(parts[1].trim()) : 500;
                    if (key) {
                        API_KEYS_INFO.push({key: key, remaining: remaining});
                    }
                }
            }
        }
    }
}

// 保存 API Keys（包括密钥和剩余次数到配置文件）
function saveApiKeys() {
    var lines = [];
    // 保存API Keys（格式：key:xxx,remaining）
    for (var i = 0; i < API_KEYS_INFO.length; i++) {
        lines.push("key:" + API_KEYS_INFO[i].key + "," + API_KEYS_INFO[i].remaining);
    }
    // 保存路径配置
    for (var i = 0; i < PATH_PATTERNS.length; i++) {
        lines.push(PATH_PATTERNS[i].name + "|" + PATH_PATTERNS[i].pattern);
    }
    configFilePath.encoding = "UTF-8";
    configFilePath.open("w");
    configFilePath.write(lines.join('\n'));
    configFilePath.close();
}

// 更新 API Key 剩余次数（保存到配置文件）
function updateApiKeyRemaining(keyIndex, usedCount) {
    if (keyIndex >= 0 && keyIndex < API_KEYS_INFO.length) {
        API_KEYS_INFO[keyIndex].remaining = 500 - usedCount;
        saveApiKeys();
    }
}

// 获取下一个 API Key
function getNextApiKey() {
    if (API_KEYS_INFO.length === 0) return "";
    currentKeyIndex = (currentKeyIndex + 1) % API_KEYS_INFO.length;
    return API_KEYS_INFO[currentKeyIndex].key;
}

// 获取当前 API Key
function getCurrentApiKey() {
    if (API_KEYS_INFO.length === 0) return "";
    return API_KEYS_INFO[currentKeyIndex].key;
}

// 获取当前 API Key 索引
function getCurrentApiKeyIndex() {
    return currentKeyIndex;
}

// 获取所有 API Key 的剩余次数总和
function getTotalRemaining() {
    var total = 0;
    for (var i = 0; i < API_KEYS_INFO.length; i++) {
        total += API_KEYS_INFO[i].remaining;
    }
    return total;
}

// 获取所有 API Key 的总配额
function getTotalQuota() {
    return API_KEYS_INFO.length * 500;
}

// 格式化总次数显示（剩余次数/总次数）
function formatTotalCount() {
    if (API_KEYS_INFO.length === 0) return "剩余 0/0";
    var totalRemaining = 0;
    for (var i = 0; i < API_KEYS_INFO.length; i++) {
        totalRemaining += API_KEYS_INFO[i].remaining;
    }
    return "剩余 " + totalRemaining + "/" + (API_KEYS_INFO.length * 500);
}

// 格式化状态文本（包含路径信息）
function formatStatusText() {
    var countText = formatTotalCount();
    var pathText = "";
    
    if (PATH_PATTERNS.length > 0 && currentPathPatternIndex >= 0 && currentPathPatternIndex < PATH_PATTERNS.length) {
        var resolvedPath = resolvePathPattern(PATH_PATTERNS[currentPathPatternIndex].pattern);
        var maxLength = 30; // 最大显示长度
        
        if (resolvedPath.length > maxLength) {
            pathText = "|路径：" + resolvedPath.substring(0, maxLength) + "...";
        } else {
            pathText = "|路径：" + resolvedPath;
        }
    }
    
    return countText + pathText;
}

// 更新状态文本（包括文本和helpTip）
function updateStatusText() {
    statusText.text = formatStatusText();
    
    // 更新 helpTip
    if (PATH_PATTERNS.length > 0 && currentPathPatternIndex >= 0 && currentPathPatternIndex < PATH_PATTERNS.length) {
        var resolvedPath = resolvePathPattern(PATH_PATTERNS[currentPathPatternIndex].pattern);
        statusText.helpTip = "剩余次数: " + getTotalRemaining() + "/" + getTotalQuota() + "\n完整路径: " + resolvedPath;
    } else {
        statusText.helpTip = "剩余次数: " + getTotalRemaining() + "/" + getTotalQuota();
    }
}

// ======================== 全局变量 ========================
var folderPath;
var logContent = ""; // 日志内容（全局变量，必须在函数声明前）
var apiKeySettingsWindow = null;
var pathSettingsWindow = null;
var logWindow = null;

// 跨平台打开URL函数
function urlOpen(url) {
    if ($.os.indexOf("Windows") != -1) {
        // Windows系统
        system.callSystem("cmd.exe /c start \"\" \"" + url + "\"");
    } else {
        // MAC系统
        system.callSystem("open \"" + url + "\"");
    }
}

// 确定源路径
loadPathPatterns();
if (PATH_PATTERNS.length > 0) {
    var resolvedPath = resolvePathPattern(PATH_PATTERNS[currentPathPatternIndex].pattern);
    folderPath = new Folder(resolvedPath);
}

// ======================== 创建主窗口 ========================
var win = new Window("palette", MAIN_WINDOW_TITLE + " v " + version + " (Auto_Tinify)", undefined);
win.orientation = "column";
win.alignChildren = ["fill", "top"];
win.spacing = 15;
win.margins = 20;

// ======================== 主控制面板 ========================
var mainPanel = win.add("panel", undefined, MAIN_PANEL_TITLE);
mainPanel.orientation = "column";
mainPanel.alignChildren = ["fill", "center"];
mainPanel.spacing = 15;
mainPanel.margins = 20;

// 操作按钮组
var buttonRow1 = mainPanel.add("group");
buttonRow1.orientation = "row";
buttonRow1.alignChildren = ["fill", "center"];
buttonRow1.spacing = 15;

var uploadButton = buttonRow1.add("button", undefined, "开始压缩");
uploadButton.preferredSize.width = 315;
uploadButton.helpTip = "点击：压缩并询问是否替换原图\n按住 Ctrl+Shift 键点击：压缩选中的图片文件";

// 第二行按钮
var buttonRow2 = mainPanel.add("group");
buttonRow2.orientation = "row";
buttonRow2.alignChildren = ["fill", "center"];
buttonRow2.spacing = 15;

var selectFileButton = buttonRow2.add("button", undefined, "选择文件");
selectFileButton.preferredSize.width = 150;
selectFileButton.helpTip = "选择一个或多个图片文件进行压缩";

var selectFolderButton = buttonRow2.add("button", undefined, "选择文件夹");
selectFolderButton.preferredSize.width = 150;
selectFolderButton.helpTip = "选择一个文件夹，递归压缩内部图片";

// 第三行按钮
var buttonRow3 = mainPanel.add("group");
buttonRow3.orientation = "row";
buttonRow3.alignChildren = ["fill", "center"];
buttonRow3.spacing = 15;

var apiKeySettingsButton = buttonRow3.add("button", undefined, "⚙ API Key设置");
apiKeySettingsButton.preferredSize.width = 150;
apiKeySettingsButton.helpTip = "打开API Key管理对话框";

var pathSettingsButton = buttonRow3.add("button", undefined, "⚙ 路径设置");
pathSettingsButton.preferredSize.width = 150;
pathSettingsButton.helpTip = "打开路径配置对话框";

// 第四行按钮
var buttonRow4 = mainPanel.add("group");
buttonRow4.orientation = "row";
buttonRow4.alignChildren = ["fill", "center"];
buttonRow4.spacing = 15;

var logButton = buttonRow4.add("button", undefined, "📋 日志");
logButton.preferredSize.width = 150;
logButton.helpTip = "打开日志查看窗口";

// 帮助按钮
var helpButton = buttonRow4.add("button", undefined, "?");
helpButton.preferredSize.width = 23;
helpButton.helpTip = "查看脚本说明";

// 进度条及状态提示
var progressBar = mainPanel.add("progressbar", undefined, 0, 100);
progressBar.preferredSize.width = 300;
progressBar.value = 0;

var statusText = mainPanel.add("statictext", undefined, formatStatusText());
statusText.alignment = ["center", "center"];
updateStatusText();

// ======================== 设置对话框 ========================

// 获取 API Key 的使用次数
function getApiKeyUsageCount(apiKey) {
    try {
        var cmd = 'curl -s -i -X POST --user api:' + apiKey +
                 ' --data-binary "" ' +
                 ' https://api.tinify.com/shrink';

        var result = system.callSystem(cmd);

        addLog("API 响应: " + result);

        var count = 0;

        var headerEnd = result.indexOf("\r\n\r\n");
        if (headerEnd !== -1) {
            var headers = result.substring(0, headerEnd);
            var headerLines = headers.split(/\r?\n/);
            for (var i = 0; i < headerLines.length; i++) {
                var line = headerLines[i];
                addLog("响应头: " + line);
                if (line.toLowerCase().indexOf("compression-count:") === 0) {
                    count = parseInt(line.substring(19).trim());
                    addLog("  找到使用次数: " + count);
                    break;
                }
            }
        }

        if (count === 0) {
            addLog("  警告：未找到 compression-count 头");
        }

        return count;
    } catch (e) {
        addLog("获取使用次数出错: " + e.toString());
        return 0;
    }
}

// 打开 API Key 设置对话框
function openApiKeySettingsWindow() {
    if (apiKeySettingsWindow) {
        loadApiKeys();
        refreshApiKeyList();
        apiKeySettingsWindow.show();
        return;
    }

    // 加载配置
    loadApiKeys();

    apiKeySettingsWindow = new Window("dialog", "API Key 设置 - Auto_Tinify", undefined);
    apiKeySettingsWindow.orientation = "column";
    apiKeySettingsWindow.alignChildren = ["fill", "top"];
    apiKeySettingsWindow.spacing = 8;
    apiKeySettingsWindow.margins = 10;
    apiKeySettingsWindow.preferredSize = [550, 360];

    var newApiKeyInput = apiKeySettingsWindow.add("edittext", undefined, "");
    newApiKeyInput.characters = 50;

    var apiKeyButtonGroup = apiKeySettingsWindow.add("group");
    apiKeyButtonGroup.orientation = "row";
    apiKeyButtonGroup.alignChildren = ["center", "center"];
    apiKeyButtonGroup.spacing = 10;

    var addApiKeyButton = apiKeyButtonGroup.add("button", undefined, "添加");
    addApiKeyButton.preferredSize.width = 80;

    var removeApiKeyButton = apiKeyButtonGroup.add("button", undefined, "删除选中");
    removeApiKeyButton.preferredSize.width = 100;

    var refreshButton = apiKeyButtonGroup.add("button", undefined, "刷新次数");
    refreshButton.preferredSize.width = 100;

    var linkButton = apiKeyButtonGroup.add("button", undefined, "获取 API Key");
    linkButton.preferredSize.width = 120;
    linkButton.onClick = function() {
        urlOpen("https://tinify.com/developers");
    };

    var apiKeyList = apiKeySettingsWindow.add("listbox", undefined, [], {
        multiselect: true
    });
    apiKeyList.preferredSize = [510, 150];
    apiKeyList.alignment = ["fill", "top"];

    var apiKeyCountText = apiKeySettingsWindow.add("statictext", undefined, "当前有 " + API_KEYS_INFO.length + " 个 API Key");
    apiKeyCountText.alignment = "left";

    function refreshApiKeyList() {
        apiKeyList.removeAll();
        for (var i = 0; i < API_KEYS_INFO.length; i++) {
            var keyInfo = API_KEYS_INFO[i];
            var maskedKey = keyInfo.key.substring(0, 12) + "..." + keyInfo.key.substring(keyInfo.key.length - 6);
            var usageInfo = "剩余: " + keyInfo.remaining + "/500";
            var formattedItem = maskedKey + "                                  " + usageInfo;
            apiKeyList.add("item", formattedItem);
        }
        apiKeyCountText.text = "当前有 " + API_KEYS_INFO.length + " 个 API Key";
    }

    addApiKeyButton.onClick = function() {
        var key = newApiKeyInput.text.trim();
        if (key) {
            var exists = false;
            for (var i = 0; i < API_KEYS_INFO.length; i++) {
                if (API_KEYS_INFO[i].key === key) {
                    exists = true;
                    break;
                }
            }
            if (!exists) {
                API_KEYS_INFO.push({key: key, remaining: 500});
                refreshApiKeyList();
                newApiKeyInput.text = "";
            } else {
                alert("该 API Key 已存在！");
            }
        } else {
            alert("请输入有效的 API Key！");
        }
    };

    removeApiKeyButton.onClick = function() {
        var selectedItems = apiKeyList.selection;
        if (selectedItems && selectedItems.length > 0) {
            var indices = [];
            for (var i = 0; i < selectedItems.length; i++) {
                indices.push(selectedItems[i].index);
            }
            indices.sort(function(a, b) { return b - a; });
            for (var j = 0; j < indices.length; j++) {
                API_KEYS_INFO.splice(indices[j], 1);
            }
            refreshApiKeyList();
        } else {
            alert("请先选择要删除的 API Key！");
        }
    };

    refreshButton.onClick = function() {
        if (API_KEYS_INFO.length === 0) {
            alert("没有可刷新的 API Key！");
            return;
        }

        var originalText = refreshButton.text;
        refreshButton.text = "刷新中...";
        refreshButton.enabled = false;

        apiKeySettingsWindow.update();

        for (var i = 0; i < API_KEYS_INFO.length; i++) {
            refreshButton.text = "刷新中 (" + (i + 1) + "/" + API_KEYS_INFO.length + ")...";
            apiKeySettingsWindow.update();
            addLog("正在刷新 API Key " + (i + 1) + " 的使用次数...");
            var usedCount = getApiKeyUsageCount(API_KEYS_INFO[i].key);
            addLog("  获取到的使用次数: " + usedCount);
            API_KEYS_INFO[i].remaining = 500 - usedCount;
        }

        saveApiKeys();
        updateStatusText();
        refreshApiKeyList();

        refreshButton.text = originalText;
        refreshButton.enabled = true;

        alert("刷新完成！\n\n" + formatTotalCount());
    };

    var buttonGroup = apiKeySettingsWindow.add("group");
    buttonGroup.orientation = "row";
    buttonGroup.alignChildren = ["center", "center"];
    buttonGroup.spacing = 10;

    var saveButton = buttonGroup.add("button", undefined, "保存");
    var cancelButton = buttonGroup.add("button", undefined, "取消");

    saveButton.onClick = function() {
        if (API_KEYS_INFO.length === 0) {
            alert("请至少添加一个 API Key！");
            return;
        }
        saveApiKeys();
        updateStatusText();
        alert("API Key 设置已保存！");
        apiKeySettingsWindow.close();
    };

    cancelButton.onClick = function() {
        apiKeySettingsWindow.close();
    };

    apiKeySettingsWindow.onClose = function() {
    };

    refreshApiKeyList();
    apiKeySettingsWindow.center();
    apiKeySettingsWindow.show();
}

// 打开路径配置对话框
function openPathSettingsWindow() {
    if (pathSettingsWindow) {
        loadPathPatterns();
        refreshPathConfig();
        pathSettingsWindow.show();
        return;
    }

    // 加载配置
    loadPathPatterns();

    pathSettingsWindow = new Window("dialog", "路径配置 - Auto_Tinify", undefined);
    pathSettingsWindow.orientation = "column";
    pathSettingsWindow.alignChildren = ["fill", "top"];
    pathSettingsWindow.spacing = 8;
    pathSettingsWindow.margins = 10;
    pathSettingsWindow.preferredSize = [550, 360];

    var selectGroup = pathSettingsWindow.add("group");
    selectGroup.orientation = "row";
    selectGroup.alignChildren = ["left", "center"];
    selectGroup.spacing = 10;

    selectGroup.add("statictext", undefined, "当前选择:");
    var pathSelectDropdown = selectGroup.add("dropdownlist", undefined, []);
    pathSelectDropdown.preferredSize.width = 300;

    var pathButtonGroup = pathSettingsWindow.add("group");
    pathButtonGroup.orientation = "row";
    pathButtonGroup.alignChildren = ["center", "center"];
    pathButtonGroup.spacing = 10;

    var addPathButton = pathButtonGroup.add("button", undefined, "添加");
    addPathButton.preferredSize.width = 60;

    var updatePathButton = pathButtonGroup.add("button", undefined, "更新");
    updatePathButton.preferredSize.width = 60;

    var removePathButton = pathButtonGroup.add("button", undefined, "删除");
    removePathButton.preferredSize.width = 60;

    var testAndViewButton = pathButtonGroup.add("button", undefined, "测试与查看");
    testAndViewButton.preferredSize.width = 100;

    var helpButton = pathButtonGroup.add("button", undefined, "帮助");
    helpButton.preferredSize.width = 60;

    var pathList = pathSettingsWindow.add("listbox", undefined, [], {
        multiselect: false
    });
    pathList.preferredSize = [510, 150];
    pathList.alignment = ["fill", "top"];

    var pathCountText = pathSettingsWindow.add("statictext", undefined, "当前有 " + PATH_PATTERNS.length + " 个路径配置");
    pathCountText.alignment = "left";

    function refreshPathConfig() {
        pathSelectDropdown.removeAll();
        for (var i = 0; i < PATH_PATTERNS.length; i++) {
            var patternInfo = PATH_PATTERNS[i];
            var displayName = patternInfo.name;
            if (i === currentPathPatternIndex) {
                displayName = "★ " + displayName;
            }
            pathSelectDropdown.add("item", displayName);
        }
        
        if (PATH_PATTERNS.length > 0 && currentPathPatternIndex >= 0 && currentPathPatternIndex < PATH_PATTERNS.length) {
            pathSelectDropdown.selection = currentPathPatternIndex;
        }
        
        pathList.removeAll();
        for (var i = 0; i < PATH_PATTERNS.length; i++) {
            var patternInfo = PATH_PATTERNS[i];
            var resolvedPath = resolvePathPattern(patternInfo.pattern);
            var displayName = patternInfo.name;
            if (i === currentPathPatternIndex) {
                displayName = "★ " + displayName;
            }
            var formattedItem = displayName + "                         " + patternInfo.pattern;
            var item = pathList.add("item", formattedItem);
            item.helpTip = "名称: " + patternInfo.name + "\n路径模式: " + patternInfo.pattern + "\n解析路径: " + resolvedPath;
        }
        pathCountText.text = "当前有 " + PATH_PATTERNS.length + " 个路径配置";
    }

    pathSelectDropdown.onChange = function() {
        if (pathSelectDropdown.selection !== null) {
            currentPathPatternIndex = pathSelectDropdown.selection.index;
            refreshPathConfig();
        }
    };

    addPathButton.onClick = function() {
        var dialog = new Window("dialog", "添加路径配置", undefined);
        dialog.orientation = "column";
        dialog.alignChildren = ["fill", "top"];
        dialog.spacing = 10;
        dialog.margins = 20;

        var nameGroup = dialog.add("group");
        nameGroup.orientation = "row";
        nameGroup.add("statictext", undefined, "名称:");
        var nameInput = nameGroup.add("edittext", undefined, "");
        nameInput.characters = 30;

        var patternGroup = dialog.add("group");
        patternGroup.orientation = "row";
        patternGroup.add("statictext", undefined, "路径模式:");
        var patternInput = patternGroup.add("edittext", undefined, "");
        patternInput.characters = 40;

        var helpText = dialog.add("statictext", undefined, "可用变量: ${projectPath}");
        helpText.alignment = "center";

        var buttonGroup = dialog.add("group");
        buttonGroup.orientation = "row";
        buttonGroup.alignChildren = ["center", "center"];
        buttonGroup.spacing = 10;

        var okButton = buttonGroup.add("button", undefined, "确定");
        var cancelButton = buttonGroup.add("button", undefined, "取消");

        okButton.onClick = function() {
            var name = nameInput.text.trim();
            var pattern = patternInput.text.trim();
            if (name && pattern) {
                PATH_PATTERNS.push({name: name, pattern: pattern});
                currentPathPatternIndex = PATH_PATTERNS.length - 1;
                refreshPathConfig();
                dialog.close();
            } else {
                alert("请输入有效的名称和路径模式！");
            }
        };

        cancelButton.onClick = function() {
            dialog.close();
        };

        dialog.center();
        dialog.show();
    };

    updatePathButton.onClick = function() {
        if (PATH_PATTERNS.length === 0) {
            alert("没有可更新的路径配置！");
            return;
        }
        
        var currentConfig = PATH_PATTERNS[currentPathPatternIndex];
        
        var dialog = new Window("dialog", "更新路径配置", undefined);
        dialog.orientation = "column";
        dialog.alignChildren = ["fill", "top"];
        dialog.spacing = 10;
        dialog.margins = 20;

        var nameGroup = dialog.add("group");
        nameGroup.orientation = "row";
        nameGroup.add("statictext", undefined, "名称:");
        var nameInput = nameGroup.add("edittext", undefined, currentConfig.name);
        nameInput.characters = 30;

        var patternGroup = dialog.add("group");
        patternGroup.orientation = "row";
        patternGroup.add("statictext", undefined, "路径模式:");
        var patternInput = patternGroup.add("edittext", undefined, currentConfig.pattern);
        patternInput.characters = 40;

        var helpText = dialog.add("statictext", undefined, "可用变量: ${projectPath}");
        helpText.alignment = "center";

        var buttonGroup = dialog.add("group");
        buttonGroup.orientation = "row";
        buttonGroup.alignChildren = ["center", "center"];
        buttonGroup.spacing = 10;

        var okButton = buttonGroup.add("button", undefined, "确定");
        var cancelButton = buttonGroup.add("button", undefined, "取消");

        okButton.onClick = function() {
            var name = nameInput.text.trim();
            var pattern = patternInput.text.trim();
            if (name && pattern) {
                PATH_PATTERNS[currentPathPatternIndex].name = name;
                PATH_PATTERNS[currentPathPatternIndex].pattern = pattern;
                refreshPathConfig();
                dialog.close();
            } else {
                alert("请输入有效的名称和路径模式！");
            }
        };

        cancelButton.onClick = function() {
            dialog.close();
        };

        dialog.center();
        dialog.show();
    };

    removePathButton.onClick = function() {
        if (PATH_PATTERNS.length === 0) {
            alert("没有可删除的路径配置！");
            return;
        }
        
        if (PATH_PATTERNS.length === 1) {
            alert("不能删除最后一个路径配置！");
            return;
        }
        
        if (currentPathPatternIndex < 0 || currentPathPatternIndex >= PATH_PATTERNS.length) {
            alert("请先选择一个有效的路径配置！");
            return;
        }
        
        var deleteIndex = currentPathPatternIndex;
        PATH_PATTERNS.splice(deleteIndex, 1);
        currentPathPatternIndex = 0;
        refreshPathConfig();
    };

    testAndViewButton.onClick = function() {
        if (PATH_PATTERNS.length === 0) {
            alert("没有可测试的路径配置！");
            return;
        }
        
        var patternInfo = PATH_PATTERNS[currentPathPatternIndex];
        var resolvedPath = resolvePathPattern(patternInfo.pattern);
        var testFolder = new Folder(resolvedPath);
        
        if (testFolder.exists) {
            var files = testFolder.getFiles();
            var imageFiles = [];
            for (var i = 0; i < files.length; i++) {
                if (!(files[i] instanceof Folder)) {
                    var ext = files[i].name.split('.').pop().toLowerCase();
                    if (["jpg", "jpeg", "png", "webp"].indexOf(ext) !== -1) {
                        try {
                            var decodedName = decodeURI(files[i].name);
                            imageFiles.push(decodedName);
                        } catch (e) {
                            imageFiles.push(files[i].name);
                        }
                    }
                }
            }
            
            var message = "路径测试结果：\n\n" +
                "名称: " + patternInfo.name + "\n" +
                "路径模式: " + patternInfo.pattern + "\n" +
                "解析路径: " + resolvedPath + "\n\n" +
                "✓ 路径存在，找到 " + imageFiles.length + " 个图片文件\n\n";
            
            if (imageFiles.length > 0) {
                message += "文件列表:\n";
                for (var i = 0; i < Math.min(imageFiles.length, 20); i++) {
                    message += "  " + imageFiles[i] + "\n";
                }
                if (imageFiles.length > 20) {
                    message += "  ... 还有 " + (imageFiles.length - 20) + " 个文件\n";
                }
            } else {
                message += "(无图片文件)";
            }
            
            alert(message);
        } else {
            alert("路径测试结果：\n\n" +
                "名称: " + patternInfo.name + "\n" +
                "路径模式: " + patternInfo.pattern + "\n" +
                "解析路径: " + resolvedPath + "\n\n" +
                "✗ 路径不存在，请检查配置！");
        }
    };

    helpButton.onClick = function() {
        var promptText = "给 AI 的 Prompt：\n\n" +
            "我需要为 After Effects 项目配置图片压缩路径，请帮我生成以下情况的路径模式：\n\n" +
            "【可用变量】\n" +
            "${projectPath} - 当前项目文件所在的父目录\n\n" +
            "【常见场景示例】\n" +
            "1. 项目旁边的\"输出\"文件夹：${projectPath}/输出\n" +
            "2. 项目文件夹下的\"images\"子文件夹：${projectPath}/images\n" +
            "3. 项目旁边的\"assets/images\"文件夹：${projectPath}/../assets/images\n" +
            "4. 指定绝对路径：D:/MyProject/images\n\n" +
            "【我的需求】\n" +
            "（请在这里描述你的具体需求）\n\n" +
            "【请返回格式】\n" +
            "名称: [简短描述]\n" +
            "路径模式: [使用${projectPath}变量的路径]";

        var helpWindow = new Window("dialog", "给 AI 的 Prompt", undefined);
        helpWindow.orientation = "column";
        helpWindow.alignChildren = ["fill", "top"];
        helpWindow.spacing = 10;
        helpWindow.margins = 15;
        helpWindow.preferredSize = [500, 300];

        helpWindow.add("statictext", undefined, "给 AI 的 Prompt（可手动复制）：");

        var helpTextPanel = helpWindow.add("edittext", undefined, promptText, {
            multiline: true,
            scrolling: true
        });
        helpTextPanel.preferredSize = [480, 250];

        helpWindow.center();
        helpWindow.show();
    };

    var buttonGroup = pathSettingsWindow.add("group");
    buttonGroup.orientation = "row";
    buttonGroup.alignChildren = ["center", "center"];
    buttonGroup.spacing = 10;

    var saveButton = buttonGroup.add("button", undefined, "保存");
    var cancelButton = buttonGroup.add("button", undefined, "取消");

    saveButton.onClick = function() {
        if (PATH_PATTERNS.length === 0) {
            alert("请至少添加一个路径配置！");
            return;
        }
        saveApiKeys();
        var resolvedPath = resolvePathPattern(PATH_PATTERNS[currentPathPatternIndex].pattern);
        folderPath = new Folder(resolvedPath);
        updateStatusText();
        alert("路径配置已保存！");
        pathSettingsWindow.close();
    };

    cancelButton.onClick = function() {
        pathSettingsWindow.close();
    };

    pathSettingsWindow.onClose = function() {
    };

    refreshPathConfig();
    pathSettingsWindow.center();
    pathSettingsWindow.show();
}

// 打开日志对话框
function openLogWindow() {
    addLog("打开日志窗口，当前日志长度: " + logContent.length);

    if (logWindow) {
        var logText = logWindow.logTextEdit;
        if (logText) {
            logText.text = logContent;
            logWindow.update();
        }
        logWindow.show();
        return;
    }

    logWindow = new Window("dialog", "日志 - Auto_Tinify", undefined);
    logWindow.orientation = "column";
    logWindow.alignChildren = ["fill", "fill"];
    logWindow.spacing = 10;
    logWindow.margins = 20;

    logWindow.add("statictext", undefined, "操作日志：");

    var logText = logWindow.add("edittext", undefined, logContent, {
        multiline: true,
        scrolling: true
    });
    logText.preferredSize = [500, 300];
    logWindow.logTextEdit = logText;

    addLog("日志窗口已创建");

    var buttonGroup = logWindow.add("group");
    buttonGroup.orientation = "row";
    buttonGroup.alignChildren = ["center", "center"];
    buttonGroup.spacing = 15;

    var clearButton = buttonGroup.add("button", undefined, "清空日志");
    var closeButton = buttonGroup.add("button", undefined, "关闭");

    clearButton.onClick = function() {
        logContent = "";
        logText.text = "";
    };

    closeButton.onClick = function() {
        logWindow.close();
    };

    logWindow.onClose = function() {
        logWindow = null;
    };

    logWindow.center();
    logWindow.show();
}

// 显示帮助窗口
function showHelpWindow() {
    var helpWindow = new Window("dialog", "关于 " + SCRIPT_TITLE + " v" + version, undefined);
    helpWindow.orientation = "column";
    helpWindow.alignChildren = ["fill", "top"];
    helpWindow.spacing = 12;
    helpWindow.margins = 20;
    helpWindow.preferredSize = [500, 450];

    // 标题
    var titlePanel = helpWindow.add("panel", undefined, "");
    titlePanel.orientation = "row";
    titlePanel.alignChildren = ["center", "center"];
    titlePanel.spacing = 15;
    titlePanel.margins = 15;

    // 左侧：图片（预留位置，可以添加Base64图片）
    var logoGroup = titlePanel.add("group");
    logoGroup.alignment = ["left", "center"];
    var logoImage = logoGroup.add("image", undefined, LOGO_IMAGE_BASE64 || undefined);
    logoImage.preferredSize = [90, 90];

    // 右侧：标题和副标题
    var titleTextGroup = titlePanel.add("group");
    titleTextGroup.orientation = "column";
    titleTextGroup.alignChildren = ["left", "center"];
    titleTextGroup.spacing = 4;

    var titleLabel = titleTextGroup.add("statictext", undefined, SCRIPT_TITLE + " v " + version);

    var subtitleLabel = titleTextGroup.add("statictext", undefined, SCRIPT_SUBTITLE);

    // 说明文本
    var descPanel = helpWindow.add("panel", undefined, "功能说明");
    descPanel.orientation = "column";
    descPanel.alignChildren = ["fill", "top"];
    descPanel.spacing = 6;
    descPanel.margins = 15;

    var descText = descPanel.add("statictext", undefined, "• 使用 Tinify API 压缩图片（JPG、PNG、WebP）", undefined);
    descText = descPanel.add("statictext", undefined, "• 支持多 API Key 轮换，自动追踪剩余次数", undefined);
    descText = descPanel.add("statictext", undefined, "• 支持路径配置，使用 ${projectPath} 变量", undefined);
    descText = descPanel.add("statictext", undefined, "• 点击\"开始压缩\"：询问替换原图或添加后缀保存", undefined);
    descText = descPanel.add("statictext", undefined, "• Ctrl+Shift + 点击：压缩选中的图片文件", undefined);
    descText = descPanel.add("statictext", undefined, "• 选择文件/文件夹：快速选择目标进行压缩", undefined);

    // 使用说明
    var usagePanel = helpWindow.add("panel", undefined, "使用说明");
    usagePanel.orientation = "column";
    usagePanel.alignChildren = ["fill", "top"];
    usagePanel.spacing = 6;
    usagePanel.margins = 15;

    var usageText = usagePanel.add("statictext", undefined, "1. 设置 API Key（从 Tinify 官网获取）", undefined);
    usageText = usagePanel.add("statictext", undefined, "2. 配置压缩路径（或使用默认路径）", undefined);
    usageText = usagePanel.add("statictext", undefined, "3. 点击\"开始压缩\"或使用\"选择文件/文件夹\"", undefined);

    // 链接按钮
    var linkPanel = helpWindow.add("group");
    linkPanel.orientation = "row";
    linkPanel.alignChildren = ["center", "center"];
    linkPanel.spacing = 15;

    var tinifyLinkButton = linkPanel.add("button", undefined, LINK_BUTTON_1_TEXT);
    tinifyLinkButton.preferredSize.width = 120;
    tinifyLinkButton.onClick = function() {
        urlOpen(LINK_BUTTON_1_URL);
    };

    var apiLinkButton = linkPanel.add("button", undefined, LINK_BUTTON_2_TEXT);
    apiLinkButton.preferredSize.width = 120;
    apiLinkButton.onClick = function() {
        urlOpen(LINK_BUTTON_2_URL);
    };

    var docLinkButton = linkPanel.add("button", undefined, LINK_BUTTON_3_TEXT);
    docLinkButton.preferredSize.width = 120;
    docLinkButton.onClick = function() {
        urlOpen(LINK_BUTTON_3_URL);
    };

    helpWindow.center();
    helpWindow.show();
}

// 添加日志输出函数
function addLog(message) {
    logContent += message + "\n";
    if (logWindow && logWindow.visible && logWindow.logTextEdit) {
        logWindow.logTextEdit.text = logContent;
        logWindow.update();
    }
    win.update();
}

// ======================== 辅助函数 ========================

// 使用 curl 命令压缩单个图片文件
function compressImage(apiKey, inputFile, outputFile, keyIndex) {
    addLog("正在压缩: " + inputFile.name);
    addLog("  使用 API Key: " + apiKey.substring(0, 8) + "..." + apiKey.substring(apiKey.length - 4));

    // 在压缩前先保存原始文件大小
    var originalFileSize = inputFile.length;

    var headerFile = new File(Folder.temp.fsName + "/tinify_headers_" + (new Date().getTime()) + ".txt");
    var tempInputFile = new File(Folder.temp.fsName + "/tinify_temp_" + (new Date().getTime()) + ".temp");
    inputFile.copy(tempInputFile);

    var uploadCmd = 'curl -s -D "' + headerFile.fsName + '" --user api:' + apiKey +
                    ' --data-binary @"' + tempInputFile.fsName + '" ' +
                    ' https://api.tinify.com/shrink';

    try {
        var uploadResult = system.callSystem(uploadCmd);

        var headers = "";
        var location = "";
        var compressionCount = 0;

        if (headerFile.exists) {
            headerFile.encoding = "UTF-8";
            headerFile.open("r");
            headers = headerFile.read();
            headerFile.close();
            headerFile.remove();

            var headerLines = headers.split(/\r?\n/);
            for (var i = 0; i < headerLines.length; i++) {
                var line = headerLines[i];
                if (line.toLowerCase().indexOf("location:") === 0) {
                    location = line.substring(10).trim();
                } else if (line.toLowerCase().indexOf("compression-count:") === 0) {
                    compressionCount = parseInt(line.substring(19).trim());
                }
            }
        }

        if (!location) {
            addLog("  错误：未获取到压缩后的图片 URL");
            addLog("  响应: " + uploadResult);
            if (tempInputFile.exists) tempInputFile.remove();
            if (headerFile.exists) headerFile.remove();
            return false;
        }

        addLog("  上传成功，正在下载压缩后的图片...");

        var tempDownloadFile = new File(Folder.temp.fsName + "/tinify_download_" + (new Date().getTime()) + ".temp");

        var downloadCmd = 'curl -s --user api:' + apiKey +
                         ' -o "' + tempDownloadFile.fsName + '" ' +
                         ' "' + location + '"';

        var downloadResult = system.callSystem(downloadCmd);

        var success = false;

        if (tempDownloadFile.exists && tempDownloadFile.length > 0) {
            var outputFileObj = new File(outputFile);
            if (tempDownloadFile.copy(outputFileObj)) {
                var compressedSize = outputFileObj.length;
                var savings = ((1 - compressedSize / originalFileSize) * 100).toFixed(2);
                addLog("  压缩完成！原始: " + formatFileSize(originalFileSize) +
                       " → 压缩后: " + formatFileSize(compressedSize) +
                       " (节省 " + savings + "%)");
                if (compressionCount > 0) {
                    addLog("  本月已使用压缩次数: " + compressionCount + "/500");
                    addLog("  剩余压缩次数: " + (500 - compressionCount) + "/500");
                    updateApiKeyRemaining(keyIndex, compressionCount);
                    updateStatusText();
                }
                success = true;
            } else {
                addLog("  错误：无法将压缩后的文件复制到目标位置");
            }
        } else {
            addLog("  错误：下载压缩后的图片失败");
        }

        if (tempDownloadFile.exists) tempDownloadFile.remove();
        if (tempInputFile.exists) tempInputFile.remove();
        if (headerFile.exists) headerFile.remove();

        return { success: success, size: outputFileObj.exists ? outputFileObj.length : 0, originalSize: originalFileSize };

    } catch (e) {
        addLog("  异常：压缩过程中出错 - " + e.toString());
        if (tempInputFile.exists) tempInputFile.remove();
        if (headerFile.exists) headerFile.remove();
        return { success: false, size: 0, originalSize: originalFileSize };
    }
}

// 格式化文件大小
function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

// 递归压缩文件夹内的图片
function compressFolder(sourceFolder, outputFolder, apiKey) {
    if (!outputFolder.exists) {
        outputFolder.create();
    }

    var files = sourceFolder.getFiles();
    var successCount = 0;
    var failCount = 0;
    var totalSize = 0;
    var originalTotalSize = 0;

    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var destFile = new File(outputFolder.fsName + "/" + file.name);

        if (file instanceof Folder) {
            var subResult = compressFolder(file, destFile, apiKey);
            successCount += subResult.success;
            failCount += subResult.fail;
            totalSize += subResult.totalSize;
            originalTotalSize += subResult.originalTotalSize;
        } else {
            var ext = file.name.split('.').pop().toLowerCase();
            if (["jpg", "jpeg", "png", "webp"].indexOf(ext) !== -1) {
                var currentApiKey = getNextApiKey();
                var keyIndex = getCurrentApiKeyIndex();
                var result = compressImage(currentApiKey, file, destFile, keyIndex);
                if (result.success) {
                    successCount++;
                    totalSize += result.size;
                    originalTotalSize += result.originalSize;
                } else {
                    failCount++;
                }
            }
        }

        var progress = Math.floor(((i + 1) / files.length) * 100);
        progressBar.value = progress;
        statusText.text = "状态：正在压缩 (" + (i + 1) + "/" + files.length + ")";
        win.update();
    }

    return { success: successCount, fail: failCount, totalSize: totalSize, originalTotalSize: originalTotalSize };
}

// 为文件名添加后缀
function addSuffixToFileName(file, suffix) {
    var name = file.name;
    var lastDot = name.lastIndexOf('.');
    var baseName, ext;
    if (lastDot !== -1) {
        baseName = name.substring(0, lastDot);
        ext = name.substring(lastDot);
    } else {
        baseName = name;
        ext = '';
    }
    return new File(file.parent.fsName + '/' + baseName + suffix + ext);
}

// 递归压缩文件夹内的图片（添加后缀保存到原图旁边）
function compressFolderWithSuffix(sourceFolder, suffix, apiKey) {
    var files = sourceFolder.getFiles();
    var successCount = 0;
    var failCount = 0;
    var totalSize = 0;
    var originalTotalSize = 0;

    for (var i = 0; i < files.length; i++) {
        var file = files[i];

        if (file instanceof Folder) {
            var subResult = compressFolderWithSuffix(file, suffix, apiKey);
            successCount += subResult.success;
            failCount += subResult.fail;
            totalSize += subResult.totalSize;
            originalTotalSize += subResult.originalTotalSize;
        } else {
            var ext = file.name.split('.').pop().toLowerCase();
            if (["jpg", "jpeg", "png", "webp"].indexOf(ext) !== -1) {
                var outputFile = addSuffixToFileName(file, suffix);
                var currentApiKey = getNextApiKey();
                var keyIndex = getCurrentApiKeyIndex();
                var result = compressImage(currentApiKey, file, outputFile, keyIndex);
                if (result.success) {
                    successCount++;
                    totalSize += result.size;
                    originalTotalSize += result.originalSize;
                } else {
                    failCount++;
                }
            }
        }

        var progress = Math.floor(((i + 1) / files.length) * 100);
        progressBar.value = progress;
        statusText.text = "状态：正在压缩 (" + (i + 1) + "/" + files.length + ")";
        win.update();
    }

    return { success: successCount, fail: failCount, totalSize: totalSize, originalTotalSize: originalTotalSize };
}

// 递归复制文件夹及其内容
function copyFolder(source, destination) {
    if (!destination.exists) {
        destination.create();
    }
    var files = source.getFiles();
    var copiedCount = 0;
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var destFile = new File(destination.fsName + "/" + file.name);
        if (file instanceof Folder) {
            copiedCount += copyFolder(file, destFile);
        } else {
            try {
                if (file.copy(destFile)) {
                    copiedCount++;
                }
            } catch (e) {
                addLog("复制文件出错：" + file.fsName + "\n" + e.toString());
            }
        }
    }
    return copiedCount;
}

// 删除文件夹内所有内容
function clearFolder(folder) {
    if (folder.exists) {
        var items = folder.getFiles();
        for (var i = 0; i < items.length; i++) {
            if (items[i] instanceof Folder) {
                clearFolder(items[i]);
                try {
                    items[i].remove();
                } catch (e) {
                    addLog("无法删除文件夹：" + items[i].fsName);
                }
            } else {
                try {
                    items[i].remove();
                } catch (e) {
                    addLog("无法删除文件：" + items[i].fsName);
                }
            }
        }
    }
}

// 获取AE中选中的图片文件
function getSelectedImageFiles() {
    var imageFiles = [];
    
    // 检查项目面板中的选中项
    if (app.project && app.project.selection && app.project.selection.length > 0) {
        for (var i = 0; i < app.project.selection.length; i++) {
            var item = app.project.selection[i];
            // 检查是否是素材项目（不是合成、文件夹等）
            if (item instanceof FootageItem) {
                // 获取素材文件路径
                if (item.file && item.file.exists) {
                    // 检查是否是图片格式
                    var ext = item.file.name.split('.').pop().toLowerCase();
                    if (["jpg", "jpeg", "png", "webp"].indexOf(ext) !== -1) {
                        imageFiles.push(item.file);
                    }
                }
            }
        }
    }
    
    // 检查合成面板中的选中图层
    if (app.project.activeItem && app.project.activeItem instanceof CompItem) {
        var selectedLayers = app.project.activeItem.selectedLayers;
        for (var i = 0; i < selectedLayers.length; i++) {
            var layer = selectedLayers[i];
            // 检查是否是图片图层
            if (layer instanceof AVLayer && layer.source instanceof FootageItem) {
                var file = layer.source.file;
                if (file && file.exists) {
                    // 检查文件扩展名
                    var ext = file.name.split('.').pop().toLowerCase();
                    if (["jpg", "jpeg", "png", "webp"].indexOf(ext) !== -1) {
                        // 确保文件未被重复添加
                        if (imageFiles.indexOf(file) === -1) {
                            imageFiles.push(file);
                        }
                    }
                }
            }
        }
    }
    
    return imageFiles;
}

// 压缩选中的图片文件
function compressSelectedFiles(files, replaceOriginal) {
    var successCount = 0;
    var failCount = 0;
    var totalSize = 0;
    var originalTotalSize = 0;
    
    progressBar.value = 0;
    
    for (var i = 0; i < files.length; i++) {
        var inputFile = files[i];
        addLog("[" + (i + 1) + "/" + files.length + "] 正在压缩: " + inputFile.name);
        
        var outputFile;
        if (replaceOriginal) {
            // 直接替换原图
            outputFile = inputFile;
        } else {
            // 压缩到临时文件夹
            var tempOutputFolder = new Folder(Folder.temp.fsName + "/auto_tiny_output");
            if (!tempOutputFolder.exists) {
                tempOutputFolder.create();
            }
            outputFile = new File(tempOutputFolder.fsName + "/" + inputFile.name);
        }
        
        var result = compressImage(getCurrentApiKey(), inputFile, outputFile, currentKeyIndex);
        
        if (result.success) {
            successCount++;
            totalSize += result.size;
            originalTotalSize += result.originalSize;
            // 切换到下一个API Key
            getNextApiKey();
        } else {
            failCount++;
        }
        
        // 更新进度条
        progressBar.value = Math.round(((i + 1) / files.length) * 100);
        win.update();
    }
    
    return {
        success: successCount,
        fail: failCount,
        totalSize: totalSize,
        originalTotalSize: originalTotalSize
    };
}

// ======================== 按钮点击事件 ========================

// 开始压缩
uploadButton.onClick = function() {
    loadApiKeys();
    loadPathPatterns();

    if (API_KEYS_INFO.length === 0) {
        alert("请先设置 API Key！\n点击'⚙ API Key 设置'按钮进行配置。");
        return;
    }

    addLog("当前配置了 " + API_KEYS_INFO.length + " 个 API Key，将自动轮换使用");
    addLog("剩余次数：" + formatTotalCount());

    // 检测按键组合
    var ctrlPressed = ScriptUI.environment.keyboardState.ctrlKey || ScriptUI.environment.keyboardState.metaKey;
    var shiftPressed = ScriptUI.environment.keyboardState.shiftKey;

    // Ctrl+Shift 点击：压缩选中的图片文件
    if (ctrlPressed && shiftPressed) {
        addLog("检测到 Ctrl+Shift 组合键，准备压缩选中的图片文件...");
        
        var selectedFiles = getSelectedImageFiles();
        
        if (selectedFiles.length === 0) {
            alert("未找到选中的图片文件！\n\n请先在项目面板或合成中选择图片图层。");
            addLog("错误：未找到选中的图片文件");
            return;
        }
        
        addLog("找到 " + selectedFiles.length + " 个选中的图片文件：");
        for (var i = 0; i < selectedFiles.length; i++) {
            addLog("  " + selectedFiles[i].fsName);
        }
        
        // 询问是否替换原图
        var replaceOriginal = confirm("是否直接替换原图？\n\n是 = 直接替换原图\n否 = 压缩后添加后缀 (_tiny) 保存到原图旁边");
        
        if (replaceOriginal) {
            var confirmResult = confirm("即将压缩并直接替换原图！\n\n⚠️ 此操作将覆盖原始文件，请确认是否继续？");
            if (!confirmResult) {
                addLog("用户取消了操作");
                updateStatusText();
                return;
            }
        }
        
        addLog("开始压缩选中的图片文件..." + (replaceOriginal ? "（将直接替换原图）" : "（添加后缀保存到原图旁边）"));
        statusText.text = "状态：开始压缩...";
        progressBar.value = 0;
        
        var successCount = 0;
        var failCount = 0;
        var totalSize = 0;
        var originalTotalSize = 0;
        
        for (var i = 0; i < selectedFiles.length; i++) {
            var inputFile = selectedFiles[i];
            var outputFile;
            
            if (replaceOriginal) {
                outputFile = inputFile;
            } else {
                outputFile = addSuffixToFileName(inputFile, "_tiny");
            }
            
            var result = compressImage(getCurrentApiKey(), inputFile, outputFile, currentKeyIndex);
            
            if (result.success) {
                successCount++;
                totalSize += result.size;
                originalTotalSize += result.originalSize;
                getNextApiKey();
            } else {
                failCount++;
            }
            
            progressBar.value = Math.round(((i + 1) / selectedFiles.length) * 100);
            win.update();
        }
        
        addLog("\n========== 压缩完成 ==========");
        addLog("成功: " + successCount + " 个文件");
        addLog("失败: " + failCount + " 个文件");
        addLog("压缩前总大小: " + formatFileSize(originalTotalSize));
        addLog("压缩后总大小: " + formatFileSize(totalSize));
        updateStatusText();
        progressBar.value = 100;

        var savedSize = originalTotalSize - totalSize;
        var savingsPercent = originalTotalSize > 0 ? ((savedSize / originalTotalSize) * 100).toFixed(2) : 0;
        alert("压缩完成！\n成功: " + successCount + " 个文件\n失败: " + failCount + " 个文件\n\n压缩前: " + formatFileSize(originalTotalSize) + "\n压缩后: " + formatFileSize(totalSize) + "\n节省了: " + formatFileSize(savedSize) + " (" + savingsPercent + "%)");
        return;
    }

    // 正常流程：压缩文件夹
    var sourceFolder = folderPath;

    if (!(sourceFolder instanceof Folder)) {
        alert("项目未保存，请先保存项目！");
        addLog("错误：项目未保存！");
        statusText.text = "状态：错误，项目未保存";
        return;
    }

    if (!sourceFolder.exists) {
        alert("源文件夹不存在: " + sourceFolder.fsName);
        addLog("错误：源文件夹不存在：" + sourceFolder.fsName);
        statusText.text = "状态：错误，源文件夹不存在";
        return;
    }

    addLog("当前操作目录为：" + sourceFolder.fsName);

    // 询问是否直接替换原图
    var replaceOriginal = confirm("是否直接替换原图？\n\n是 = 直接替换原图\n否 = 压缩后添加后缀 (_tiny) 保存到原图旁边");
    
    if (replaceOriginal) {
        var confirmResult = confirm("即将压缩并直接替换原图！\n\n⚠️ 此操作将覆盖原始文件，请确认是否继续？");
        if (!confirmResult) {
            addLog("用户取消了操作");
            updateStatusText();
            return;
        }
        addLog("开始压缩图片（将直接替换原图）...");
    } else {
        addLog("开始压缩图片（添加后缀保存到原图旁边）...");
    }
    
    statusText.text = "状态：开始压缩...";
    progressBar.value = 0;
    
    var result;
    if (replaceOriginal) {
        result = compressFolder(sourceFolder, sourceFolder, getCurrentApiKey());
    } else {
        result = compressFolderWithSuffix(sourceFolder, "_tiny", getCurrentApiKey());
    }

    addLog("\n========== 压缩完成 ==========");
    addLog("成功: " + result.success + " 个文件");
    addLog("失败: " + result.fail + " 个文件");
    addLog("压缩前总大小: " + formatFileSize(result.originalTotalSize));
    addLog("压缩后总大小: " + formatFileSize(result.totalSize));
    updateStatusText();
    progressBar.value = 100;

    var savedSize = result.originalTotalSize - result.totalSize;
    var savingsPercent = result.originalTotalSize > 0 ? ((savedSize / result.originalTotalSize) * 100).toFixed(2) : 0;
    alert("压缩完成！\n成功: " + result.success + " 个文件\n失败: " + result.fail + " 个文件\n\n压缩前: " + formatFileSize(result.originalTotalSize) + "\n压缩后: " + formatFileSize(result.totalSize) + "\n节省了: " + formatFileSize(savedSize) + " (" + savingsPercent + "%)");
};

// API Key设置按钮
apiKeySettingsButton.onClick = function() {
    openApiKeySettingsWindow();
};

// 路径设置按钮
pathSettingsButton.onClick = function() {
    openPathSettingsWindow();
};

// 日志按钮
logButton.onClick = function() {
    openLogWindow();
};

// 帮助按钮事件
helpButton.onClick = function() {
    showHelpWindow();
};

// 选择文件按钮事件
selectFileButton.onClick = function() {
    loadApiKeys();
    
    if (API_KEYS_INFO.length === 0) {
        alert("请先设置 API Key！\n点击'⚙ API Key 设置'按钮进行配置。");
        return;
    }
    
    var files = File.openDialog("选择要压缩的图片文件", "图片文件:*.jpg;*.jpeg;*.png;*.webp", true);
    
    if (!files || files.length === 0) {
        addLog("用户取消了文件选择");
        return;
    }
    
    // 确保是数组
    if (!(files instanceof Array)) {
        files = [files];
    }
    
    // 过滤出图片文件
    var imageFiles = [];
    for (var i = 0; i < files.length; i++) {
        var ext = files[i].name.split('.').pop().toLowerCase();
        if (["jpg", "jpeg", "png", "webp"].indexOf(ext) !== -1) {
            imageFiles.push(files[i]);
        }
    }
    
    if (imageFiles.length === 0) {
        alert("未选择有效的图片文件！");
        return;
    }
    
    addLog("选择了 " + imageFiles.length + " 个图片文件：");
    for (var i = 0; i < imageFiles.length; i++) {
        addLog("  " + imageFiles[i].fsName);
    }
    
    // 询问是否替换原图
    var replaceOriginal = confirm("是否直接替换原图？\n\n是 = 直接替换原图\n否 = 压缩后添加后缀 (_tiny) 保存到原图旁边");
    
    if (replaceOriginal) {
        var confirmResult = confirm("即将压缩并直接替换原图！\n\n⚠️ 此操作将覆盖原始文件，请确认是否继续？");
        if (!confirmResult) {
            addLog("用户取消了操作");
            return;
        }
    }
    
    addLog("开始压缩图片..." + (replaceOriginal ? "（将直接替换原图）" : "（添加后缀保存到原图旁边）"));
    statusText.text = "状态：开始压缩...";
    progressBar.value = 0;
    
    var successCount = 0;
    var failCount = 0;
    var totalSize = 0;
    var originalTotalSize = 0;
    
    for (var i = 0; i < imageFiles.length; i++) {
        var inputFile = imageFiles[i];
        var outputFile;
        
        if (replaceOriginal) {
            outputFile = inputFile;
        } else {
            outputFile = addSuffixToFileName(inputFile, "_tiny");
        }
        
        var result = compressImage(getCurrentApiKey(), inputFile, outputFile, currentKeyIndex);
        
        if (result.success) {
            successCount++;
            totalSize += result.size;
            originalTotalSize += result.originalSize;
            getNextApiKey();
        } else {
            failCount++;
        }
        
        progressBar.value = Math.round(((i + 1) / imageFiles.length) * 100);
        win.update();
    }
    
    addLog("\n========== 压缩完成 ==========");
    addLog("成功: " + successCount + " 个文件");
    addLog("失败: " + failCount + " 个文件");
    addLog("压缩前总大小: " + formatFileSize(originalTotalSize));
    addLog("压缩后总大小: " + formatFileSize(totalSize));
    updateStatusText();
    progressBar.value = 100;
    
    var savedSize = originalTotalSize - totalSize;
    var savingsPercent = originalTotalSize > 0 ? ((savedSize / originalTotalSize) * 100).toFixed(2) : 0;
    alert("压缩完成！\n成功: " + successCount + " 个文件\n失败: " + failCount + " 个文件\n\n压缩前: " + formatFileSize(originalTotalSize) + "\n压缩后: " + formatFileSize(totalSize) + "\n节省了: " + formatFileSize(savedSize) + " (" + savingsPercent + "%)");
};

// 选择文件夹按钮事件
selectFolderButton.onClick = function() {
    loadApiKeys();
    
    if (API_KEYS_INFO.length === 0) {
        alert("请先设置 API Key！\n点击'⚙ API Key 设置'按钮进行配置。");
        return;
    }
    
    var folder = Folder.selectDialog("选择要压缩的文件夹");
    
    if (!folder) {
        addLog("用户取消了文件夹选择");
        return;
    }
    
    if (!folder.exists) {
        alert("选择的文件夹不存在！");
        return;
    }
    
    addLog("选择的文件夹：" + folder.fsName);
    
    // 询问是否替换原图
    var replaceOriginal = confirm("是否直接替换原图？\n\n是 = 直接替换原图\n否 = 压缩后添加后缀 (_tiny) 保存到原图旁边");
    
    if (replaceOriginal) {
        var confirmResult = confirm("即将压缩并直接替换原图！\n\n⚠️ 此操作将覆盖原始文件，请确认是否继续？");
        if (!confirmResult) {
            addLog("用户取消了操作");
            return;
        }
    }
    
    addLog("开始压缩文件夹..." + (replaceOriginal ? "（将直接替换原图）" : "（添加后缀保存到原图旁边）"));
    statusText.text = "状态：开始压缩...";
    progressBar.value = 0;
    
    var result;
    if (replaceOriginal) {
        result = compressFolder(folder, folder, getCurrentApiKey());
    } else {
        result = compressFolderWithSuffix(folder, "_tiny", getCurrentApiKey());
    }
    
    addLog("\n========== 压缩完成 ==========");
    addLog("成功: " + result.success + " 个文件");
    addLog("失败: " + result.fail + " 个文件");
    addLog("压缩前总大小: " + formatFileSize(result.originalTotalSize));
    addLog("压缩后总大小: " + formatFileSize(result.totalSize));
    updateStatusText();
    progressBar.value = 100;
    
    var savedSize = result.originalTotalSize - result.totalSize;
    var savingsPercent = result.originalTotalSize > 0 ? ((savedSize / result.originalTotalSize) * 100).toFixed(2) : 0;
    alert("压缩完成！\n成功: " + result.success + " 个文件\n失败: " + result.fail + " 个文件\n\n压缩前: " + formatFileSize(result.originalTotalSize) + "\n压缩后: " + formatFileSize(result.totalSize) + "\n节省了: " + formatFileSize(savedSize) + " (" + savingsPercent + "%)");
};

// ======================== 显示窗口 ========================
loadApiKeys();
loadPathPatterns();
updateStatusText();
addLog("Auto_Tinify v" + version + " 已启动");
addLog("当前配置了 " + API_KEYS_INFO.length + " 个 API Key");
addLog("剩余/总计：" + getTotalRemaining() + "/" + getTotalQuota());
addLog("当前路径配置：" + PATH_PATTERNS[currentPathPatternIndex].name);
addLog("实际路径：" + resolvePathPattern(PATH_PATTERNS[currentPathPatternIndex].pattern));

win.center();
win.show();