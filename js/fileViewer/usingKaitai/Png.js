// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('kaitai-struct/KaitaiStream'));
  } else {
    root.Png = factory(root.KaitaiStream);
  }
}(this, function (KaitaiStream) {
var Png = (function() {
  Png.ColorType = Object.freeze({
    GREYSCALE: 0,
    TRUECOLOR: 2,
    INDEXED: 3,
    GREYSCALE_ALPHA: 4,
    TRUECOLOR_ALPHA: 6,

    0: "GREYSCALE",
    2: "TRUECOLOR",
    3: "INDEXED",
    4: "GREYSCALE_ALPHA",
    6: "TRUECOLOR_ALPHA",
  });

  Png.PhysUnit = Object.freeze({
    UNKNOWN: 0,
    METER: 1,

    0: "UNKNOWN",
    1: "METER",
  });

  Png.CompressionMethods = Object.freeze({
    ZLIB: 0,

    0: "ZLIB",
  });

  function Png(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  Png.prototype._read = function() {
    this.magic = this._io.readBytes(8);
    if (!((KaitaiStream.byteArrayCompare(this.magic, [137, 80, 78, 71, 13, 10, 26, 10]) == 0))) {
      throw new KaitaiStream.ValidationNotEqualError([137, 80, 78, 71, 13, 10, 26, 10], this.magic, this._io, "/seq/0");
    }
    this.ihdrLen = this._io.readBytes(4);
    if (!((KaitaiStream.byteArrayCompare(this.ihdrLen, [0, 0, 0, 13]) == 0))) {
      throw new KaitaiStream.ValidationNotEqualError([0, 0, 0, 13], this.ihdrLen, this._io, "/seq/1");
    }
    this.ihdrType = this._io.readBytes(4);
    if (!((KaitaiStream.byteArrayCompare(this.ihdrType, [73, 72, 68, 82]) == 0))) {
      throw new KaitaiStream.ValidationNotEqualError([73, 72, 68, 82], this.ihdrType, this._io, "/seq/2");
    }
    this.ihdr = new IhdrChunk(this._io, this, this._root);
    this.ihdrCrc = this._io.readBytes(4);
    this.chunks = []
    var i = 0;
    do {
      var _ = new Chunk(this._io, this, this._root);
      this.chunks.push(_);
      i++;
    } while (!( ((_.type == "IEND") || (this._io.isEof())) ));
  }

  var Rgb = Png.Rgb = (function() {
    function Rgb(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Rgb.prototype._read = function() {
      this.r = this._io.readU1();
      this.g = this._io.readU1();
      this.b = this._io.readU1();
    }

    return Rgb;
  })();

  var Chunk = Png.Chunk = (function() {
    function Chunk(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Chunk.prototype._read = function() {
      this.len = this._io.readU4be();
      this.type = KaitaiStream.bytesToStr(this._io.readBytes(4), "UTF-8");
      switch (this.type) {
      case "iTXt":
        this._raw_body = this._io.readBytes(this.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new InternationalTextChunk(_io__raw_body, this, this._root);
        break;
      case "gAMA":
        this._raw_body = this._io.readBytes(this.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new GamaChunk(_io__raw_body, this, this._root);
        break;
      case "tIME":
        this._raw_body = this._io.readBytes(this.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new TimeChunk(_io__raw_body, this, this._root);
        break;
      case "PLTE":
        this._raw_body = this._io.readBytes(this.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new PlteChunk(_io__raw_body, this, this._root);
        break;
      case "bKGD":
        this._raw_body = this._io.readBytes(this.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new BkgdChunk(_io__raw_body, this, this._root);
        break;
      case "pHYs":
        this._raw_body = this._io.readBytes(this.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new PhysChunk(_io__raw_body, this, this._root);
        break;
      case "tEXt":
        this._raw_body = this._io.readBytes(this.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new TextChunk(_io__raw_body, this, this._root);
        break;
      case "cHRM":
        this._raw_body = this._io.readBytes(this.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new ChrmChunk(_io__raw_body, this, this._root);
        break;
      case "sRGB":
        this._raw_body = this._io.readBytes(this.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new SrgbChunk(_io__raw_body, this, this._root);
        break;
      case "zTXt":
        this._raw_body = this._io.readBytes(this.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new CompressedTextChunk(_io__raw_body, this, this._root);
        break;
      default:
        this.body = this._io.readBytes(this.len);
        break;
      }
      this.crc = this._io.readBytes(4);
    }

    return Chunk;
  })();

  /**
   * Background chunk for images with indexed palette.
   */

  var BkgdIndexed = Png.BkgdIndexed = (function() {
    function BkgdIndexed(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    BkgdIndexed.prototype._read = function() {
      this.paletteIndex = this._io.readU1();
    }

    return BkgdIndexed;
  })();

  var Point = Png.Point = (function() {
    function Point(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Point.prototype._read = function() {
      this.xInt = this._io.readU4be();
      this.yInt = this._io.readU4be();
    }
    Object.defineProperty(Point.prototype, 'x', {
      get: function() {
        if (this._m_x !== undefined)
          return this._m_x;
        this._m_x = (this.xInt / 100000.0);
        return this._m_x;
      }
    });
    Object.defineProperty(Point.prototype, 'y', {
      get: function() {
        if (this._m_y !== undefined)
          return this._m_y;
        this._m_y = (this.yInt / 100000.0);
        return this._m_y;
      }
    });

    return Point;
  })();

  /**
   * Background chunk for greyscale images.
   */

  var BkgdGreyscale = Png.BkgdGreyscale = (function() {
    function BkgdGreyscale(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    BkgdGreyscale.prototype._read = function() {
      this.value = this._io.readU2be();
    }

    return BkgdGreyscale;
  })();

  /**
   * @see {@link https://www.w3.org/TR/PNG/#11cHRM|Source}
   */

  var ChrmChunk = Png.ChrmChunk = (function() {
    function ChrmChunk(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    ChrmChunk.prototype._read = function() {
      this.whitePoint = new Point(this._io, this, this._root);
      this.red = new Point(this._io, this, this._root);
      this.green = new Point(this._io, this, this._root);
      this.blue = new Point(this._io, this, this._root);
    }

    return ChrmChunk;
  })();

  /**
   * @see {@link https://www.w3.org/TR/PNG/#11IHDR|Source}
   */

  var IhdrChunk = Png.IhdrChunk = (function() {
    function IhdrChunk(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    IhdrChunk.prototype._read = function() {
      this.width = this._io.readU4be();
      this.height = this._io.readU4be();
      this.bitDepth = this._io.readU1();
      this.colorType = this._io.readU1();
      this.compressionMethod = this._io.readU1();
      this.filterMethod = this._io.readU1();
      this.interlaceMethod = this._io.readU1();
    }

    return IhdrChunk;
  })();

  /**
   * @see {@link https://www.w3.org/TR/PNG/#11PLTE|Source}
   */

  var PlteChunk = Png.PlteChunk = (function() {
    function PlteChunk(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    PlteChunk.prototype._read = function() {
      this.entries = [];
      var i = 0;
      while (!this._io.isEof()) {
        this.entries.push(new Rgb(this._io, this, this._root));
        i++;
      }
    }

    return PlteChunk;
  })();

  /**
   * @see {@link https://www.w3.org/TR/PNG/#11sRGB|Source}
   */

  var SrgbChunk = Png.SrgbChunk = (function() {
    SrgbChunk.Intent = Object.freeze({
      PERCEPTUAL: 0,
      RELATIVE_COLORIMETRIC: 1,
      SATURATION: 2,
      ABSOLUTE_COLORIMETRIC: 3,

      0: "PERCEPTUAL",
      1: "RELATIVE_COLORIMETRIC",
      2: "SATURATION",
      3: "ABSOLUTE_COLORIMETRIC",
    });

    function SrgbChunk(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    SrgbChunk.prototype._read = function() {
      this.renderIntent = this._io.readU1();
    }

    return SrgbChunk;
  })();

  /**
   * Compressed text chunk effectively allows to store key-value
   * string pairs in PNG container, compressing "value" part (which
   * can be quite lengthy) with zlib compression.
   * @see {@link https://www.w3.org/TR/PNG/#11zTXt|Source}
   */

  var CompressedTextChunk = Png.CompressedTextChunk = (function() {
    function CompressedTextChunk(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    CompressedTextChunk.prototype._read = function() {
      this.keyword = KaitaiStream.bytesToStr(this._io.readBytesTerm(0, false, true, true), "UTF-8");
      this.compressionMethod = this._io.readU1();
      this._raw_textDatastream = this._io.readBytesFull();
      this.textDatastream = KaitaiStream.processZlib(this._raw_textDatastream);
    }

    /**
     * Indicates purpose of the following text data.
     */

    return CompressedTextChunk;
  })();

  /**
   * Background chunk for truecolor images.
   */

  var BkgdTruecolor = Png.BkgdTruecolor = (function() {
    function BkgdTruecolor(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    BkgdTruecolor.prototype._read = function() {
      this.red = this._io.readU2be();
      this.green = this._io.readU2be();
      this.blue = this._io.readU2be();
    }

    return BkgdTruecolor;
  })();

  /**
   * @see {@link https://www.w3.org/TR/PNG/#11gAMA|Source}
   */

  var GamaChunk = Png.GamaChunk = (function() {
    function GamaChunk(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    GamaChunk.prototype._read = function() {
      this.gammaInt = this._io.readU4be();
    }
    Object.defineProperty(GamaChunk.prototype, 'gammaRatio', {
      get: function() {
        if (this._m_gammaRatio !== undefined)
          return this._m_gammaRatio;
        this._m_gammaRatio = (100000.0 / this.gammaInt);
        return this._m_gammaRatio;
      }
    });

    return GamaChunk;
  })();

  /**
   * Background chunk stores default background color to display this
   * image against. Contents depend on `color_type` of the image.
   * @see {@link https://www.w3.org/TR/PNG/#11bKGD|Source}
   */

  var BkgdChunk = Png.BkgdChunk = (function() {
    function BkgdChunk(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    BkgdChunk.prototype._read = function() {
      switch (this._root.ihdr.colorType) {
      case Png.ColorType.INDEXED:
        this.bkgd = new BkgdIndexed(this._io, this, this._root);
        break;
      case Png.ColorType.TRUECOLOR_ALPHA:
        this.bkgd = new BkgdTruecolor(this._io, this, this._root);
        break;
      case Png.ColorType.GREYSCALE_ALPHA:
        this.bkgd = new BkgdGreyscale(this._io, this, this._root);
        break;
      case Png.ColorType.TRUECOLOR:
        this.bkgd = new BkgdTruecolor(this._io, this, this._root);
        break;
      case Png.ColorType.GREYSCALE:
        this.bkgd = new BkgdGreyscale(this._io, this, this._root);
        break;
      }
    }

    return BkgdChunk;
  })();

  /**
   * "Physical size" chunk stores data that allows to translate
   * logical pixels into physical units (meters, etc) and vice-versa.
   * @see {@link https://www.w3.org/TR/PNG/#11pHYs|Source}
   */

  var PhysChunk = Png.PhysChunk = (function() {
    function PhysChunk(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    PhysChunk.prototype._read = function() {
      this.pixelsPerUnitX = this._io.readU4be();
      this.pixelsPerUnitY = this._io.readU4be();
      this.unit = this._io.readU1();
    }

    /**
     * Number of pixels per physical unit (typically, 1 meter) by X
     * axis.
     */

    /**
     * Number of pixels per physical unit (typically, 1 meter) by Y
     * axis.
     */

    return PhysChunk;
  })();

  /**
   * International text chunk effectively allows to store key-value string pairs in
   * PNG container. Both "key" (keyword) and "value" (text) parts are
   * given in pre-defined subset of iso8859-1 without control
   * characters.
   * @see {@link https://www.w3.org/TR/PNG/#11iTXt|Source}
   */

  var InternationalTextChunk = Png.InternationalTextChunk = (function() {
    function InternationalTextChunk(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    InternationalTextChunk.prototype._read = function() {
      this.keyword = KaitaiStream.bytesToStr(this._io.readBytesTerm(0, false, true, true), "UTF-8");
      this.compressionFlag = this._io.readU1();
      this.compressionMethod = this._io.readU1();
      this.languageTag = KaitaiStream.bytesToStr(this._io.readBytesTerm(0, false, true, true), "ASCII");
      this.translatedKeyword = KaitaiStream.bytesToStr(this._io.readBytesTerm(0, false, true, true), "UTF-8");
      this.text = KaitaiStream.bytesToStr(this._io.readBytesFull(), "UTF-8");
    }

    /**
     * Indicates purpose of the following text data.
     */

    /**
     * 0 = text is uncompressed, 1 = text is compressed with a
     * method specified in `compression_method`.
     */

    /**
     * Human language used in `translated_keyword` and `text`
     * attributes - should be a language code conforming to ISO
     * 646.IRV:1991.
     */

    /**
     * Keyword translated into language specified in
     * `language_tag`. Line breaks are not allowed.
     */

    /**
     * Text contents ("value" of this key-value pair), written in
     * language specified in `language_tag`. Linke breaks are
     * allowed.
     */

    return InternationalTextChunk;
  })();

  /**
   * Text chunk effectively allows to store key-value string pairs in
   * PNG container. Both "key" (keyword) and "value" (text) parts are
   * given in pre-defined subset of iso8859-1 without control
   * characters.
   * @see {@link https://www.w3.org/TR/PNG/#11tEXt|Source}
   */

  var TextChunk = Png.TextChunk = (function() {
    function TextChunk(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    TextChunk.prototype._read = function() {
      this.keyword = KaitaiStream.bytesToStr(this._io.readBytesTerm(0, false, true, true), "iso8859-1");
      this.text = KaitaiStream.bytesToStr(this._io.readBytesFull(), "iso8859-1");
    }

    /**
     * Indicates purpose of the following text data.
     */

    return TextChunk;
  })();

  /**
   * Time chunk stores time stamp of last modification of this image,
   * up to 1 second precision in UTC timezone.
   * @see {@link https://www.w3.org/TR/PNG/#11tIME|Source}
   */

  var TimeChunk = Png.TimeChunk = (function() {
    function TimeChunk(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    TimeChunk.prototype._read = function() {
      this.year = this._io.readU2be();
      this.month = this._io.readU1();
      this.day = this._io.readU1();
      this.hour = this._io.readU1();
      this.minute = this._io.readU1();
      this.second = this._io.readU1();
    }

    return TimeChunk;
  })();

  return Png;
})();
return Png;
}));
