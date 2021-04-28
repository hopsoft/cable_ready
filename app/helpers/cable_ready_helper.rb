# frozen_string_literal: true

module CableReadyHelper
  include CableReady::Compoundable
  include CableReady::StreamIdentifier

  def stream_from(*keys)
    keys.select!(&:itself)
    tag.stream_from(identifier: signed_stream_identifier(compound(keys)))
  end
end
